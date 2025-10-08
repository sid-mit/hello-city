import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import { useAppStore } from '@/stores/appStore';
import { cities } from '@/data/cities';
import { useDynamicCityData } from '@/hooks/useDynamicCityData';
import { CityMarker } from './CityMarker';
import { PhraseDrawer } from '../PhraseDrawer/PhraseDrawer';
import { CitySelector } from '../CitySelector/CitySelector';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYW5pbnlhZyIsImEiOiJjbWdmNHF6MHUwNG9oMmtuMGhubWRlaWJ3In0.7cdKmRPJHIj-j-HzFojggA';

mapboxgl.accessToken = MAPBOX_TOKEN;

export const MapView = () => {
  const { selectedCity, selectedCategory, genderPreference, selectCity, selectCategory } = useAppStore();
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [isLaunching, setIsLaunching] = useState(true);
  const [comingSoonCity, setComingSoonCity] = useState<string | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const topBarRef = useRef<HTMLDivElement>(null);

  // Fetch dynamic city data from database
  const { data: cityData, isLoading: isCityDataLoading } = useDynamicCityData({
    cityId: selectedCity?.id || '',
    genderPreference,
  });

  const handleCityClick = useCallback((city: any) => {
    // Show coming soon popup for Paris and Mexico City
    if (city.id === 'paris' || city.id === 'mexico-city') {
      setComingSoonCity(city.id);
      setTimeout(() => setComingSoonCity(null), 2000);
      return;
    }

    selectCity(city);
    setShowCitySelector(false);
    
    // Initial fly to city (will be adjusted once markers load)
    if (map.current) {
      map.current.flyTo({
        center: [city.coordinates.lng, city.coordinates.lat],
        zoom: 11,
        duration: 2000,
      });
    }
  }, [selectCity]);

  const handleBackToWorld = useCallback(() => {
    selectCity(null);
    selectCategory(null);
    
    // Fly back to world view
    if (map.current) {
      map.current.flyTo({
      center: [90, 20],
        zoom: 1.5,
        duration: 2000,
      });
    }
  }, [selectCity, selectCategory]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    selectCategory(categoryId);
  }, [selectCategory]);

  const handleCloseDrawer = useCallback(() => {
    selectCategory(null);
  }, [selectCategory]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map with zoomed out view for launch animation
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      center: [30, 20],
      zoom: 0.5,
      pitch: 20,
    });

    map.current.on('style.load', () => {
      if (!map.current) return;

      // Start the launch animation sequence after a brief moment
      setTimeout(() => {
        if (!map.current) return;
        
        // Smooth zoom into default view with rotation
        map.current.flyTo({
          center: [90, 20],
          zoom: 1.5,
          pitch: 0,
          duration: 2200,
          essential: true,
          easing: (t: number) => {
            // Elastic ease-out for Apple-like feel
            return t < 0.5 
              ? 4 * t * t * t 
              : 1 - Math.pow(-2 * t + 2, 3) / 2;
          }
        });

        setTimeout(() => {
          setIsLaunching(false);
        }, 2500);
      }, 300);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, []);

  // Update markers based on selected city
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (!selectedCity) {
      // Show city markers
      cities.forEach((city) => {
        const el = document.createElement('div');
        const root = createRoot(el);
        
        root.render(
          <CityMarker
            city={city}
            onClick={() => handleCityClick(city)}
            isSelected={false}
          />
        );

        const marker = new mapboxgl.Marker(el)
          .setLngLat([city.coordinates.lng, city.coordinates.lat])
          .addTo(map.current!);

        markersRef.current.push(marker);
      });
    } else if (cityData && !isCityDataLoading) {
      // Show category markers from database
      const bounds = new mapboxgl.LngLatBounds();
      const placedPositions: Array<{ x: number; y: number; width: number; height: number }> = [];
      
      // Helper function to check overlap
      const hasOverlap = (pos1: any, pos2: any, threshold = 0.1): boolean => {
        const dx = Math.abs(pos1.x - pos2.x);
        const dy = Math.abs(pos1.y - pos2.y);
        const minDist = (pos1.width + pos2.width) / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDist * (1 - threshold);
      };
      
      // Helper function to find non-overlapping position
      const findNonOverlappingPosition = (
        originalLngLat: [number, number],
        attempt = 0
      ): [number, number] => {
        if (attempt > 20) return originalLngLat; // Give up after 20 attempts
        
        const testPoint = map.current!.project(originalLngLat);
        const iconSize = 104; // w-26 = 104px
        
        const testPos = {
          x: testPoint.x,
          y: testPoint.y,
          width: iconSize,
          height: iconSize,
        };
        
        // Check if overlaps with any placed position
        const overlaps = placedPositions.some(placed => hasOverlap(testPos, placed));
        
        if (!overlaps) {
          placedPositions.push(testPos);
          return originalLngLat;
        }
        
        // Try spiral pattern: move in expanding circle
        const spiralRadius = 0.005 * (Math.floor(attempt / 8) + 1);
        const spiralAngle = (attempt % 8) * (Math.PI / 4);
        
        const newLng = originalLngLat[0] + spiralRadius * Math.cos(spiralAngle);
        const newLat = originalLngLat[1] + spiralRadius * Math.sin(spiralAngle);
        
        return findNonOverlappingPosition([newLng, newLat], attempt + 1);
      };
      
      cityData.categories.forEach((category) => {
        const el = document.createElement('div');
        el.className = 'cursor-pointer transform transition-all hover:scale-110';
        el.style.zIndex = '1000'; // Ensure icons are above top bar
        
        // Use custom icon image if available, otherwise use emoji
        // Increased size by 30% again: w-20->w-26 (80px->104px), text-6xl->text-7xl
        const iconContent = category.iconImage 
          ? `<img src="${category.iconImage}" alt="${category.title}" class="w-26 h-26 object-contain drop-shadow-2xl" />`
          : `<span class="text-7xl drop-shadow-2xl">${category.emoji}</span>`;
        
        el.innerHTML = iconContent;
        el.onclick = () => handleCategoryClick(category.id);

        // Original position from data
        const originalLngLat: [number, number] = [category.mapPosition[1], category.mapPosition[0]];
        
        // Find non-overlapping position
        const finalLngLat = findNonOverlappingPosition(originalLngLat);
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat(finalLngLat)
          .addTo(map.current!);

        markersRef.current.push(marker);
        bounds.extend(finalLngLat);
      });

      // Fit map to show all markers with increased padding for larger icons
      if (!bounds.isEmpty()) {
        const topBarHeight = topBarRef.current?.offsetHeight || 0;
        const topPadding = topBarHeight + 100; // Increased from topBarHeight + 24
        map.current.fitBounds(bounds, {
          padding: { top: topPadding, bottom: 140, left: 140, right: 140 }, // Increased padding
          maxZoom: 15,
          duration: 1500,
        });
      }
    }
  }, [selectedCity, cityData, isCityDataLoading, handleCityClick, handleCategoryClick]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1,
        scale: 1,
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className="relative w-full h-screen"
    >
      {/* Back/City Info Bar (below header) */}
      {selectedCity && (
        <div ref={topBarRef} className="absolute top-20 left-0 right-0 z-10 glass border-b border-border/50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToWorld}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to World
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{selectedCity.emoji}</span>
              <div>
                <h2 className="text-lg font-bold">{selectedCity.name}</h2>
                <p className="text-xs text-muted-foreground">
                  Learn {selectedCity.language}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map */}
      <div 
        ref={mapContainer} 
        className="w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F8FF 100%)'
        }}
      />

      {/* Coming Soon Popup */}
      {comingSoonCity && (() => {
        const city = cities.find(c => c.id === comingSoonCity);
        if (!city || !map.current) return null;
        
        const point = map.current.project([city.coordinates.lng, city.coordinates.lat]);
        
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-50 pointer-events-none"
            style={{
              left: `${point.x}px`,
              top: `${point.y - 80}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="glass rounded-lg px-4 py-2 whitespace-nowrap shadow-large">
              <p className="font-semibold text-sm">Coming Soon!</p>
            </div>
          </motion.div>
        );
      })()}

      {/* Bottom Center: Text + Button (only when no city selected) */}
      {!selectedCity && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute inset-x-0 bottom-12 z-30 pointer-events-none"
        >
          <div className="mx-auto w-full max-w-md px-4 flex flex-col items-center gap-6 text-center pointer-events-auto">
            {/* Instructional Text */}
            <p className="text-base font-medium font-gilroy" style={{ color: '#404040' }}>
              Tap a city to explore local phrases
            </p>
            
            {/* Choose City Button */}
            <button
              onClick={() => setShowCitySelector(true)}
              className="px-20 py-3 rounded-[30px] hover:opacity-90 transition-all font-outfit text-lg font-semibold"
              style={{ backgroundColor: '#D2E0FF', color: '#417CFF' }}
            >
              Choose City
            </button>
          </div>
        </motion.div>
      )}

      {/* City Selector */}
      <CitySelector
        cities={cities}
        onCitySelect={handleCityClick}
        isVisible={showCitySelector}
        onClose={() => setShowCitySelector(false)}
      />

      {/* Phrase Drawer */}
      {selectedCategory && cityData && !isCityDataLoading && (() => {
        const category = cityData.categories.find(c => c.id === selectedCategory);
        if (!category) return null;
        
        // Enrich situations with all required fields
        const enrichedSituations = category.situations.map(situation => ({
          ...situation,
          cityId: selectedCity.id,
          cityName: selectedCity.name,
          cityEmoji: selectedCity.emoji,
          categoryColor: category.color,
        }));
        
        return (
          <PhraseDrawer
            categoryTitle={category.title}
            categoryEmoji={category.emoji}
            categoryColor={category.color}
            categoryDescription={category.description}
            categoryIconImage={category.iconImage}
            situations={enrichedSituations}
            onClose={handleCloseDrawer}
          />
        );
      })()}

      {/* Loading state */}
      {selectedCity && isCityDataLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-40">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-lg font-semibold">Loading phrases</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {selectedCity && !isCityDataLoading && (!cityData || cityData.categories.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-40">
          <div className="text-center max-w-md px-4">
            <p className="text-lg font-semibold mb-2">No phrases found</p>
            <p className="text-sm text-muted-foreground">
              This city doesn't have any phrases yet. Import phrases via the Admin panel.
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
