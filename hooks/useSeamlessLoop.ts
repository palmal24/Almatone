import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useCallback, useEffect, useRef, useState } from 'react';

const CROSSFADE_MS = 1200;   // how long the crossfade lasts
const POLL_MS = 100;          // how often we check position

export function useSeamlessLoop(source: any) {
  const playerA = useAudioPlayer();
  const playerB = useAudioPlayer();
  const statusA = useAudioPlayerStatus(playerA);
  const statusB = useAudioPlayerStatus(playerB);

  const [isPlaying, setIsPlaying] = useState(false);
  const active = useRef<'A' | 'B'>('A');
  const crossfading = useRef(false);
  const fadeInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      cleanup();
    };
  }, []);

  const cleanup = () => {
    if (fadeInterval.current) clearInterval(fadeInterval.current);
    if (pollInterval.current) clearInterval(pollInterval.current);
    fadeInterval.current = null;
    pollInterval.current = null;
    crossfading.current = false;
    try { playerA.pause(); playerA.volume = 1; } catch {}
    try { playerB.pause(); playerB.volume = 1; } catch {}
  };

  const getCurrent = () => active.current === 'A' ? playerA : playerB;
  const getNext    = () => active.current === 'A' ? playerB : playerA;
  const getStatus  = () => active.current === 'A' ? statusA : statusB;

  const doCrossfade = useCallback(() => {
    if (crossfading.current || !isMounted.current) return;
    crossfading.current = true;

    const current = getCurrent();
    const next = getNext();

    // Start next player silently from beginning
    try {
      next.volume = 0;
      next.seekTo(0);
      next.play();
    } catch {}

    const steps = 20;
    let step = 0;
    const stepMs = CROSSFADE_MS / steps;

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    fadeInterval.current = setInterval(() => {
      if (!isMounted.current) {
        clearInterval(fadeInterval.current!);
        return;
      }
      step++;
      const t = step / steps;
      // Equal-power crossfade curve — sounds much smoother than linear
      const volOut = Math.cos(t * Math.PI / 2);
      const volIn  = Math.sin(t * Math.PI / 2);

      try { current.volume = volOut; } catch {}
      try { next.volume    = volIn;  } catch {}

      if (step >= steps) {
        clearInterval(fadeInterval.current!);
        fadeInterval.current = null;
        try { current.pause(); current.volume = 1; } catch {}
        active.current = active.current === 'A' ? 'B' : 'A';
        crossfading.current = false;
      }
    }, stepMs);
  }, [playerA, playerB]);

  const startPolling = useCallback(() => {
    if (pollInterval.current) clearInterval(pollInterval.current);

    pollInterval.current = setInterval(() => {
      if (!isMounted.current || !isPlaying) return;

      const status = getStatus();
      const duration = status?.duration ?? 0;
      const current  = status?.currentTime ?? 0;

      if (duration <= 0) return;

      const timeLeft = (duration - current) * 1000; // ms remaining

      if (timeLeft <= CROSSFADE_MS && !crossfading.current) {
        doCrossfade();
      }
    }, POLL_MS);
  }, [isPlaying, doCrossfade, statusA, statusB]);

  // Restart polling whenever isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      startPolling();
    } else {
      if (pollInterval.current) clearInterval(pollInterval.current);
    }
  }, [isPlaying, startPolling]);

  const play = useCallback(() => {
    if (isPlaying) return;

    active.current = 'A';
    crossfading.current = false;

    try {
      playerA.replace(source);
      playerB.replace(source);

      playerA.volume = 1;
      playerB.volume = 0;
      playerA.seekTo(0);
      playerA.play();
    } catch {}

    setIsPlaying(true);
  }, [isPlaying, playerA, playerB, source]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    cleanup();
  }, []);

  return { play, pause, isPlaying };
}