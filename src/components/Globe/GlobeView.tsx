import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Globe from 'globe.gl';
import { cities } from '@/data/cities';
import { City } from '@/stores/appStore';

interface GlobeViewProps {
  onCityClick: (city: City) => void;
}

export const GlobeView = ({ onCityClick }: GlobeViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a div for the globe
    const globeDiv = document.createElement('div');
    containerRef.current.appendChild(globeDiv);

    // Initialize Globe with the element
    const myGlobe = new Globe(globeDiv)
      .backgroundColor('rgba(248, 249, 250, 0)')
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .atmosphereColor('#667eea')
      .atmosphereAltitude(0.15)
      .width(containerRef.current.clientWidth)
      .height(containerRef.current.clientHeight);

    globeInstance.current = myGlobe;

    // Add city points
    const cityPoints = cities.map((city) => ({
      lat: city.coordinates.lat,
      lng: city.coordinates.lng,
      size: 0.5,
      color: '#667eea',
      label: `${city.emoji} ${city.name}`,
      city: city,
    }));

    myGlobe
      .pointsData(cityPoints)
      .pointColor('color')
      .pointAltitude(0.05)
      .pointRadius('size')
      .pointLabel('label')
      .onPointClick((point: any) => {
        if (point.city) {
          onCityClick(point.city);
        }
      });

    // Auto-rotate
    myGlobe.controls().autoRotate = true;
    myGlobe.controls().autoRotateSpeed = 0.5;

    // Point camera at a nice angle
    myGlobe.pointOfView({ lat: 30, lng: 0, altitude: 2.5 }, 0);

    // Handle resize
    const handleResize = () => {
      if (containerRef.current && myGlobe) {
        myGlobe.width(containerRef.current.clientWidth);
        myGlobe.height(containerRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && globeDiv) {
        containerRef.current.removeChild(globeDiv);
      }
    };
  }, [onCityClick]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-full"
      ref={containerRef}
    />
  );
};
