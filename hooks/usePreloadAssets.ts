import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import SOUNDS from '@constants/sounds';

export function usePreloadAssets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function preloadIcons() {
      try {
        const icons: number[] = [];

        for (const category of Object.values(SOUNDS)) {
          for (const sound of Object.values(category)) {
            icons.push(sound.icon);
          }
        }

        await Asset.loadAsync(icons);
      } catch (e) {
        console.warn('Icon preload failed:', e);
      } finally {
        if (isMounted) setReady(true);
      }
    }

    preloadIcons();

    return () => {
      isMounted = false;
    };
  }, []);

  return ready;
}