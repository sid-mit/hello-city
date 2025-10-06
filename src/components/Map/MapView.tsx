import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import { useAppStore } from '@/stores/appStore';
import { cities } from '@/data/cities';
import { getCityData } from '@/data/cityData';
import { CityMarker } from './CityMarker';
import { PhraseDrawer } from '../PhraseDrawer/PhraseDrawer';
import { CitySelector } from '../CitySelector/CitySelector';
import { Button } from '../ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYW5pbnlhZyIsImEiOiJjbWdmNHF6MHUwNG9oMmtuMGhubWRlaWJ3In0.7cdKmRPJHIj-j-HzFojggA';

mapboxgl.accessToken = MAPBOX_TOKEN;

export const MapView = () => {
  const { selectedCity, selectedCategory, selectCity, selectCategory, selectLocation } = useAppStore();
  const [showCitySelector, setShowCitySelector] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const cityData = selectedCity ? getCityData(selectedCity.id) : null;

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
    selectLocation(null);
    
    // Fly back to world view
    if (map.current) {
      map.current.flyTo({
        center: [0, 20],
        zoom: 2,
        duration: 2000,
      });
    }
  }, [selectCity, selectLocation]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    selectCategory(categoryId);
  }, [selectCategory]);

  const handleCloseDrawer = useCallback(() => {
    selectCategory(null);
  }, [selectCategory]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [0, 20],
      zoom: 2,
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
    } else if (cityData) {
      // Show category markers
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
  }, [selectedCity, cityData, handleCityClick, handleCategoryClick]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-screen"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {selectedCity && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToWorld}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            {selectedCity ? (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedCity.emoji}</span>
                <div>
                  <h1 className="text-xl font-bold">{selectedCity.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    Learn {selectedCity.language}
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-bold">TravelSpeak</h1>
                <p className="text-sm text-muted-foreground">
                  Learn phrases for your destination
                </p>
              </div>
            )}
          </div>
          {!selectedCity && (
            <Button
              onClick={() => setShowCitySelector(true)}
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Choose City
            </Button>
          )}
        </div>
      </div>

      {/* Map */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Info Overlay */}
      {!selectedCity ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-8 left-4 right-4 md:left-auto md:right-8 md:w-80 z-10"
        >
          <div className="glass rounded-2xl p-4 shadow-large">
            <h3 className="font-semibold mb-2">Welcome to TravelSpeak</h3>
            <p className="text-sm text-muted-foreground">
              Click on any city marker or use the "Choose City" button to start learning essential phrases for your destination
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-24 left-4 right-4 md:left-auto md:right-8 md:w-80 z-10"
        >
          <div className="glass rounded-2xl p-4 shadow-large">
            <h3 className="font-semibold mb-2">Explore Locations</h3>
            <p className="text-sm text-muted-foreground">
              Tap any marker to learn essential phrases for that location
            </p>
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
      {selectedCategory && cityData && (
        <PhraseDrawer
          categoryTitle={cityData.categories.find(c => c.id === selectedCategory)?.title || ''}
          categoryEmoji={cityData.categories.find(c => c.id === selectedCategory)?.emoji || ''}
          situations={cityData.categories.find(c => c.id === selectedCategory)?.situations || []}
          onClose={handleCloseDrawer}
        />
      )}
    </motion.div>
  );
};
