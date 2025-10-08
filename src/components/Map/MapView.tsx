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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Fetch dynamic city data from database
  const { data: cityData, isLoading: isCityDataLoading } = useDynamicCityData({
    cityId: selectedCity?.id || '',
    genderPreference,
  });

  const handleCityClick = useCallback((city: any) => {
    selectCity(city);
    setShowCitySelector(false);
    
    // Fly to city
    if (map.current) {
      map.current.flyTo({
        center: [city.coordinates.lng, city.coordinates.lat],
        zoom: 12,
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

        // Switch back to standard projection after animation
        setTimeout(() => {
          if (!map.current) return;
          map.current.setProjection('mercator');
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
      cityData.categories.forEach((category) => {
        const el = document.createElement('div');
        el.className = 'cursor-pointer transform transition-all hover:scale-110';
        el.innerHTML = `
          <div class="flex items-center justify-center w-12 h-12 bg-card rounded-full shadow-lg border-2 border-primary">
            <span class="text-2xl">${category.emoji}</span>
          </div>
        `;
        el.onclick = () => handleCategoryClick(category.id);

        const marker = new mapboxgl.Marker(el)
          .setLngLat([category.mapPosition[1], category.mapPosition[0]])
          .addTo(map.current!);

        markersRef.current.push(marker);
      });
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
        <div className="absolute top-20 left-0 right-0 z-10 glass border-b border-border/50">
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
