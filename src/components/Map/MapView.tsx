import { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import { useAppStore } from '@/stores/appStore';
import { getCityLocations } from '@/data/cities';
import { LocationMarker } from './LocationMarker';
import { PhraseDrawer } from '../PhraseDrawer/PhraseDrawer';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbTRtNjBoa3UwYjM5MmtvZjBldmpzMGJmIn0.VRrsLYF9TlZivK8qVvO9_g';

mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapViewProps {
  onBack: () => void;
}

export const MapView = ({ onBack }: MapViewProps) => {
  const { selectedCity, selectedLocation, selectLocation } = useAppStore();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const locations = selectedCity ? getCityLocations(selectedCity.id) : [];

  const handleMarkerClick = useCallback((location: any) => {
    selectLocation(location);
  }, [selectLocation]);

  const handleCloseDrawer = useCallback(() => {
    selectLocation(null);
  }, [selectLocation]);

  useEffect(() => {
    if (!mapContainer.current || !selectedCity) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [selectedCity.coordinates.lng, selectedCity.coordinates.lat],
      zoom: 12,
    });

    // Add markers
    locations.forEach((location) => {
      const el = document.createElement('div');
      const root = createRoot(el);
      
      root.render(
        <LocationMarker
          location={location}
          onClick={() => handleMarkerClick(location)}
          isSelected={selectedLocation?.id === location.id}
        />
      );

      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.coordinates.lng, location.coordinates.lat])
        .addTo(map.current!);

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      map.current?.remove();
    };
  }, [selectedCity, locations, handleMarkerClick, selectedLocation]);

  if (!selectedCity) return null;

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
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Globe
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{selectedCity.emoji}</span>
            <div>
              <h1 className="text-xl font-bold">{selectedCity.name}</h1>
              <p className="text-sm text-muted-foreground">
                Learn {selectedCity.language}
              </p>
            </div>
          </div>
          <div className="w-24" /> {/* Spacer for balance */}
        </div>
      </div>

      {/* Map */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Map Overlay Info */}
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

      {/* Phrase Drawer */}
      {selectedLocation && (
        <PhraseDrawer
          location={selectedLocation}
          onClose={handleCloseDrawer}
        />
      )}
    </motion.div>
  );
};
