import CATEGORIES, { SOUNDS } from '@constants/sounds';
import { useSeamlessLoop } from '@hooks/useSeamlessLoop';

type SeamlessPlayer = ReturnType<typeof useSeamlessLoop>;

export function useSoundPlayers() {
  // Hooks must be called in a fixed order
  const players: SeamlessPlayer[] = [
    useSeamlessLoop(SOUNDS.nature.blizzard.audio),
    useSeamlessLoop(SOUNDS.nature.campfire.audio),
    useSeamlessLoop(SOUNDS.nature.cave_drips.audio),
    useSeamlessLoop(SOUNDS.nature.cricket_night.audio),
    useSeamlessLoop(SOUNDS.nature.forest_birds.audio),
    useSeamlessLoop(SOUNDS.nature.gentle_rain.audio),
    useSeamlessLoop(SOUNDS.nature.howling_wind.audio),
    useSeamlessLoop(SOUNDS.nature.light_rain.audio),
    useSeamlessLoop(SOUNDS.nature.lightning_strikes.audio),
    useSeamlessLoop(SOUNDS.nature.ocean_waves.audio),
    useSeamlessLoop(SOUNDS.nature.rain_dripping.audio),
    useSeamlessLoop(SOUNDS.nature.rain_tent.audio),
    useSeamlessLoop(SOUNDS.nature.river_flow.audio),
    useSeamlessLoop(SOUNDS.nature.rustling_leaves.audio),
    useSeamlessLoop(SOUNDS.nature.thunderstorm.audio),
    useSeamlessLoop(SOUNDS.nature.tropical_rain.audio),
    useSeamlessLoop(SOUNDS.nature.waterfall.audio),
    useSeamlessLoop(SOUNDS.nature.windstorm.audio),
    useSeamlessLoop(SOUNDS.household.air_conditioner.audio),
    useSeamlessLoop(SOUNDS.calm.binaural_beats_theta.audio),
    useSeamlessLoop(SOUNDS.urban.bar_ambience.audio),
    useSeamlessLoop(SOUNDS.sleep.delta_waves.audio),
    useSeamlessLoop(SOUNDS.focus.brown_noise_focus.audio),
  ];

  // This order must be in sync with SOUNDS. Object insertion order follows the catalog.
  const soundIds = Object.entries(SOUNDS).flatMap(([, category]) => Object.keys(category));
  const PLAYER_MAP: Record<string, SeamlessPlayer> = Object.fromEntries(
    soundIds.map((soundId, index) => [soundId, players[index]]),
  );

  return { PLAYER_MAP, CATEGORIES };
}
