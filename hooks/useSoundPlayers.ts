import CATEGORIES, { SOUNDS } from '@constants/sounds';
import { useSeamlessLoop } from '@hooks/useSeamlessLoop';

type SeamlessPlayer = ReturnType<typeof useSeamlessLoop>;

export function useSoundPlayers() {
  // One player per unique audio file
  const playerGentleRain      = useSeamlessLoop(SOUNDS.nature.gentle_rain.audio);
  const playerOceanWaves      = useSeamlessLoop(SOUNDS.nature.ocean_waves.audio);
  const playerRiverFlow       = useSeamlessLoop(SOUNDS.nature.river_flow.audio);
  const playerWaterfall       = useSeamlessLoop(SOUNDS.nature.waterfall.audio);
  const playerBlizzard        = useSeamlessLoop(SOUNDS.nature.blizzard.audio);
  const playerCampfire        = useSeamlessLoop(SOUNDS.nature.campfire.audio);
  const playerCaveDrops       = useSeamlessLoop(SOUNDS.nature.cave_drips.audio);
  const playerCricketNight    = useSeamlessLoop(SOUNDS.nature.cricket_night.audio);
  const playerForestBirds     = useSeamlessLoop(SOUNDS.nature.forest_birds.audio);
  const playerHowlingWind     = useSeamlessLoop(SOUNDS.nature.howling_wind.audio);
  const playerLightRain       = useSeamlessLoop(SOUNDS.nature.light_rain.audio);
  const playerLightningStrikes = useSeamlessLoop(SOUNDS.nature.lightning_strikes.audio);
  const playerRainDripping    = useSeamlessLoop(SOUNDS.nature.rain_dripping.audio);
  const playerRainTent        = useSeamlessLoop(SOUNDS.nature.rain_tent.audio);
  const playerRustlingLeaves  = useSeamlessLoop(SOUNDS.nature.rustling_leaves.audio);
  const playerThunderstorm    = useSeamlessLoop(SOUNDS.nature.thunderstorm.audio);
  const playerTropicalRain    = useSeamlessLoop(SOUNDS.nature.tropical_rain.audio);
  const playerWindstorm       = useSeamlessLoop(SOUNDS.nature.windstorm.audio);

  const playerAirConditioner  = useSeamlessLoop(SOUNDS.household.air_conditioner.audio);

  const playerBinauralBeatsTheta = useSeamlessLoop(SOUNDS.calm.binaural_beats_theta.audio);

  const playerBarAmbience     = useSeamlessLoop(SOUNDS.urban.bar_ambience.audio);

  const playerDeltaWaves      = useSeamlessLoop(SOUNDS.sleep.delta_waves.audio);

  const playerBrownNoiseFocus = useSeamlessLoop(SOUNDS.focus.brown_noise_focus.audio);

  // Keys MUST exactly match the id fields in CATEGORIES
  const PLAYER_MAP: Record<string, SeamlessPlayer> = {
    // Nature
    gentle_rain:        playerGentleRain,
    ocean_waves:        playerOceanWaves,
    river_flow:         playerRiverFlow,
    waterfall:          playerWaterfall,
    blizzard:           playerBlizzard,
    campfire:           playerCampfire,
    cave_drips:         playerCaveDrops,
    cricket_night:      playerCricketNight,
    forest_birds:       playerForestBirds,
    howling_wind:       playerHowlingWind,
    light_rain:         playerLightRain,
    lightning_strikes:  playerLightningStrikes,
    rain_dripping:      playerRainDripping,
    rain_tent:          playerRainTent,
    rustling_leaves:    playerRustlingLeaves,
    thunderstorm:       playerThunderstorm,
    tropical_rain:      playerTropicalRain,
    windstorm:          playerWindstorm,
    // Household
    air_conditioner:    playerAirConditioner,
    // Calm
    binaural_beats_theta: playerBinauralBeatsTheta,
    // Urban
    bar_ambience:       playerBarAmbience,
    // Sleep
    delta_waves:        playerDeltaWaves,
    // Focus
    brown_noise_focus:  playerBrownNoiseFocus,
  };

  return { PLAYER_MAP, CATEGORIES };
}