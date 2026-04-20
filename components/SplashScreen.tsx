import { Asset } from 'expo-asset';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;
  const ripple3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Preload all icon images and sounds in parallel with animations
    const preloadAssets = Asset.loadAsync([
      require('@assets/images/icons/gentle_rain.png'),
      require('@assets/images/icons/ocean_waves.png'),
      require('@assets/images/icons/river_flow.png'),
      require('@assets/images/icons/waterfall.png'),
      require('@assets/images/icons/waterfall_short.png'),
      require('@assets/images/icons/heavy_rain.png'),
      require('@assets/sounds/calm/gentle_rain.m4a'),
      require('@assets/sounds/calm/ocean_waves.m4a'),
      require('@assets/sounds/calm/river_flow.m4a'),
      require('@assets/sounds/calm/waterfall.m4a'),
      require('@assets/sounds/calm/heavy_rain.m4a'),
      require('@assets/sounds/calm/waterfall_short.m4a'),
      require('@assets/sounds/nature/blizzard.m4a'),
      require('@assets/sounds/nature/campfire.m4a'),
    ]);

    // Ripple animations
    const createRipple = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );

    const r1 = createRipple(ripple1, 0);
    const r2 = createRipple(ripple2, 600);
    const r3 = createRipple(ripple3, 1200);

    r1.start();
    r2.start();
    r3.start();

    const animationDone = new Promise<void>((resolve) => {
      Animated.sequence([
        Animated.delay(300),
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(logoScale, {
            toValue: 1,
            friction: 6,
            tension: 60,
            useNativeDriver: true,
          }),
        ]),
        Animated.delay(300),
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.delay(1200),
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(taglineOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => resolve());
    });

    Promise.all([animationDone, preloadAssets]).then(() => {
      r1.stop();
      r2.stop();
      r3.stop();
      onFinish();
    });
  }, []);

  const makeRippleStyle = (anim: Animated.Value) => ({
    opacity: anim.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 0.4, 0] }),
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.2] }) }],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.ripple, makeRippleStyle(ripple1)]} />
      <Animated.View style={[styles.ripple, makeRippleStyle(ripple2)]} />
      <Animated.View style={[styles.ripple, makeRippleStyle(ripple3)]} />

      <Animated.View
        style={[
          styles.logoContainer,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🌿</Text>
        </View>
        <Text style={styles.logoText}>ALMATONE</Text>
      </Animated.View>

      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        sounds for the soul
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1f1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1.5,
    borderColor: '#3ecf8e',
    backgroundColor: 'transparent',
  },
  logoContainer: {
    alignItems: 'center',
    gap: 16,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#1a3329',
    borderWidth: 1.5,
    borderColor: '#3ecf8e44',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3ecf8e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 44,
  },
  logoText: {
    fontSize: 26,
    fontWeight: '300',
    letterSpacing: 10,
    color: '#e8f5ee',
    fontFamily: 'System',
  },
  tagline: {
    position: 'absolute',
    bottom: '28%',
    fontSize: 13,
    letterSpacing: 4,
    color: '#3ecf8e99',
    fontWeight: '300',
  },
});