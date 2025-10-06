import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Onboarding } from '@/components/Onboarding';
import { MapView } from '@/components/Map/MapView';
import { useAppStore } from '@/stores/appStore';

const Index = () => {
  const [showMap, setShowMap] = useState(false);
  const { setShowMap: setStoreShowMap, selectCity } = useAppStore();

  const handleOnboardingComplete = () => {
    setShowMap(true);
    setStoreShowMap(true);
  };

  const handleBackToGlobe = () => {
    setShowMap(false);
    setStoreShowMap(false);
    selectCity(null);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {!showMap ? (
          <Onboarding key="onboarding" onComplete={handleOnboardingComplete} />
        ) : (
          <MapView key="map" onBack={handleBackToGlobe} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
