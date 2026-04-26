import SoundCard from '@components/SoundCard';
import { useSeamlessLoop } from '@hooks/useSeamlessLoop';
import { useSoundPlayers } from '@hooks/useSoundPlayers';

import { setAudioModeAsync } from 'expo-audio';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SoundItem } from '../types/sound';

const MAX_SIMULTANEOUS = 3;

// Alias the return type of useSeamlessLoop for cleaner usage
type SeamlessPlayer = ReturnType<typeof useSeamlessLoop>;

export default function MainMenu() {
  const { PLAYER_MAP, CATEGORIES } = useSoundPlayers();

  const [playingIds, setPlayingIds] = useState<Set<string>>(new Set());
  const stopBtnScale  = useRef(new Animated.Value(1)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true });
    Animated.timing(headerOpacity, { toValue: 1, duration: 700, useNativeDriver: true }).start();
  }, []);

  const handleSoundPress = (item: SoundItem) => {
    const isPlaying = playingIds.has(item.id);
    const player = PLAYER_MAP[item.id];

    if (!player) {
      console.error(`No player found for sound id: "${item.id}". Add it to PLAYER_MAP.`);
      return;
    }

    if (isPlaying) {
      player.pause();
      setPlayingIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    } else {
      if (playingIds.size >= MAX_SIMULTANEOUS) return;
      try {
        player.play();
      } catch(e) {
        console.warn('Playback failed', e);
      }
      setPlayingIds((prev) => new Set([...prev, item.id]));
    }
  };

  const handleStopAll = () => {
    Animated.sequence([
      Animated.spring(stopBtnScale, { toValue: 0.9, useNativeDriver: true, friction: 5 }),
      Animated.spring(stopBtnScale, { toValue: 1,   useNativeDriver: true, friction: 5 }),
    ]).start();

    Object.values(PLAYER_MAP).forEach((p) => p.pause());
    setPlayingIds(new Set());
  };

  const activeCount = playingIds.size;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a1a15" />

      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <View>
          <Text style={styles.appName}>ALMATONE</Text>
          <Text style={styles.subtitle}>soundscape mixer</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.counter}>{activeCount}/{MAX_SIMULTANEOUS}</Text>
          <Text style={styles.counterLabel}>playing</Text>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((category) => (
          <View key={category.id} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.soundRow}
            >
              {category.sounds.map((item) => {
                const isPlaying = playingIds.has(item.id);
                const isDisabled = !isPlaying && activeCount >= MAX_SIMULTANEOUS;
                return (
                  <SoundCard
                    key={item.id}
                    name={item.name}
                    icon={item.icon}
                    isPlaying={isPlaying}
                    isDisabled={isDisabled}
                    onPress={() => handleSoundPress(item)}
                  />
                );
              })}
            </ScrollView>
          </View>
        ))}
        <View style={{ height: 110 }} />
      </ScrollView>

      <View style={styles.stopBarWrapper}>
        <Animated.View style={{ transform: [{ scale: stopBtnScale }] }}>
          <Pressable
            onPress={handleStopAll}
            disabled={activeCount === 0}
            style={({ pressed }) => [
              styles.stopButton,
              activeCount === 0 && styles.stopButtonInactive,
              pressed && { opacity: 0.8 },
            ]}
          >
            <View style={styles.stopInner}>
              <View style={styles.stopIcon} />
            </View>
            <Text style={styles.stopLabel}>
              {activeCount === 0 ? 'No sounds playing' : `Stop all (${activeCount})`}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0a1a15' },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 16 : 8,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#1e3b2f',
  },
  appName: { fontSize: 22, fontWeight: '300', letterSpacing: 8, color: '#e8f5ee' },
  subtitle: { fontSize: 11, letterSpacing: 3, color: '#3ecf8e88', marginTop: 2 },
  headerRight: { alignItems: 'flex-end' },
  counter: { fontSize: 22, fontWeight: '200', color: '#3ecf8e', letterSpacing: 1 },
  counterLabel: { fontSize: 10, letterSpacing: 2, color: '#3ecf8e66' },
  scrollView: { flex: 1 },
  scrollContent: { paddingTop: 24, paddingBottom: 16 },
  categorySection: { marginBottom: 32 },
  categoryTitle: {
    fontSize: 13,
    letterSpacing: 4,
    color: '#3ecf8ecc',
    fontWeight: '500',
    textTransform: 'uppercase',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  soundRow: { paddingLeft: 24, paddingRight: 12 },
  stopBarWrapper: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingBottom: Platform.OS === 'ios' ? 32 : 20,
    paddingTop: 12,
    paddingHorizontal: 24,
    backgroundColor: '#0a1a15ee',
    borderTopWidth: 1,
    borderTopColor: '#1e3b2f',
    alignItems: 'center',
  },
  stopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#1a3329',
    borderWidth: 1.5,
    borderColor: '#3ecf8e',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 32,
    shadowColor: '#3ecf8e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  stopButtonInactive: { borderColor: '#1e3b2f', backgroundColor: '#111f1a', shadowOpacity: 0 },
  stopInner: {
    width: 22, height: 22, borderRadius: 11,
    borderWidth: 1.5, borderColor: '#3ecf8e',
    alignItems: 'center', justifyContent: 'center',
  },
  stopIcon: { width: 9, height: 9, borderRadius: 2, backgroundColor: '#3ecf8e' },
  stopLabel: { fontSize: 14, color: '#b8e8d0', letterSpacing: 1, fontWeight: '400' },
});