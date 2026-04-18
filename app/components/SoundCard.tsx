import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface SoundCardProps {
  name: string;
  icon: ImageSourcePropType;
  isPlaying: boolean;
  isDisabled: boolean;
  onPress: () => void;
}

export default function SoundCard({ name, icon, isPlaying, isDisabled, onPress }: SoundCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const glowAnim = useRef(new Animated.Value(0)).current;

  const pulseLoop = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isPlaying ? 1.04 : 1,
      friction: 6,
      useNativeDriver: true,
    }).start();

    Animated.timing(glowAnim, {
      toValue: isPlaying ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (isPlaying) {
      pulseLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.current.start();
    } else {
      pulseLoop.current?.stop();
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }

    return () => {
      pulseLoop.current?.stop();
    };
  }, [isPlaying]);

  const borderColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1e3b2f', '#3ecf8e'],
  });

  const bgColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#111f1a', '#0e2e22'],
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [{ opacity: pressed ? 0.75 : isDisabled ? 0.4 : 1 }]}
    >
      <Animated.View style={[styles.card, { borderColor, backgroundColor: bgColor }]}>
        <Animated.View style={[styles.inner, { transform: [{ scale: scaleAnim }] }]}>
          {isPlaying && (
            <Animated.View
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: pulseAnim }],
                  opacity: pulseAnim.interpolate({
                    inputRange: [1, 1.12],
                    outputRange: [0.5, 0],
                  }),
                },
              ]}
            />
          )}

          <Image source={icon} style={[styles.icon, isDisabled && styles.iconDimmed]} />
          {isPlaying && <View style={styles.playingDot} />}
        </Animated.View>

        <Text style={[styles.label, isPlaying && styles.labelActive]} numberOfLines={2}>
          {name}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 120,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    paddingHorizontal: 8,
    paddingVertical: 12,
    gap: 8,
    overflow: 'visible',
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#3ecf8e',
  },
  icon: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
  },
  iconDimmed: {
    opacity: 0.5,
  },
  label: {
    fontSize: 11,
    color: '#7aab92',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  labelActive: {
    color: '#3ecf8e',
  },
  playingDot: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#3ecf8e',
  },
});