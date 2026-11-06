import type { Category, SoundAsset, SoundItem } from '../types/sound';

type SoundDefinition = SoundAsset & {
  name: string;
  listed?: boolean;
};

type CategoryDefinition = {
  title: string;
  sounds: Record<string, SoundDefinition>;
};

/**
 * Sounds needs to be adder here once. Asset requires must stay static so Metro can bundle them.
 * Set `listed: true` to show an item in the sound browser; all entries are available
 * through SOUNDS for players and asset preloading.
 */
const SOUND_CATALOG: Record<string, CategoryDefinition> = {
  nature: {
    title: 'Nature',
    sounds: {
      blizzard: { name: 'Blizzard', listed: true, icon: require('@assets/images/icons/nature/blizzard.jpeg'), audio: require('@assets/sounds/nature/blizzard.m4a') },
      campfire: { name: 'Campfire', listed: true, icon: require('@assets/images/icons/nature/campfire.jpeg'), audio: require('@assets/sounds/nature/campfire.m4a') },
      cave_drips: { name: 'Cave Drips', listed: true, icon: require('@assets/images/icons/nature/cave_drips.jpeg'), audio: require('@assets/sounds/nature/cave_drips.m4a') },
      cricket_night: { name: 'Cricket Night', icon: require('@assets/images/icons/nature/cricket_night.jpeg'), audio: require('@assets/sounds/nature/cricket_night.m4a') },
      forest_birds: { name: 'Forest Birds', icon: require('@assets/images/icons/nature/forest_birds.jpeg'), audio: require('@assets/sounds/nature/forest_birds.m4a') },
      gentle_rain: { name: 'Gentle Rain', listed: true, icon: require('@assets/images/icons/nature/gentle_rain.jpeg'), audio: require('@assets/sounds/nature/gentle_rain.m4a') },
      howling_wind: { name: 'Howling Wind', icon: require('@assets/images/icons/nature/howling_wind.jpeg'), audio: require('@assets/sounds/nature/howling_wind.m4a') },
      light_rain: { name: 'Light Rain', icon: require('@assets/images/icons/nature/light_rain.jpeg'), audio: require('@assets/sounds/nature/light_rain.m4a') },
      lightning_strikes: { name: 'Lightning Strikes', icon: require('@assets/images/icons/nature/lighting_strikes.jpeg'), audio: require('@assets/sounds/nature/lighting_strikes.m4a') },
      ocean_waves: { name: 'Ocean Waves', listed: true, icon: require('@assets/images/icons/nature/ocean_waves.jpeg'), audio: require('@assets/sounds/nature/ocean_waves.m4a') },
      rain_dripping: { name: 'Rain Dripping', icon: require('@assets/images/icons/nature/rain_dripping.jpeg'), audio: require('@assets/sounds/nature/rain_dripping.m4a') },
      rain_tent: { name: 'Rain Tent', icon: require('@assets/images/icons/nature/rain_tent.jpeg'), audio: require('@assets/sounds/nature/rain_tent.m4a') },
      river_flow: { name: 'River Flow', listed: true, icon: require('@assets/images/icons/nature/river_flow.jpeg'), audio: require('@assets/sounds/nature/river_flow.m4a') },
      rustling_leaves: { name: 'Rustling Leaves', icon: require('@assets/images/icons/nature/rustling_leaves.jpeg'), audio: require('@assets/sounds/nature/rustling_leaves.m4a') },
      thunderstorm: { name: 'Thunderstorm', icon: require('@assets/images/icons/nature/thunderstorm.jpeg'), audio: require('@assets/sounds/nature/thunderstorm.m4a') },
      tropical_rain: { name: 'Tropical Rain', icon: require('@assets/images/icons/nature/tropical_rain.jpeg'), audio: require('@assets/sounds/nature/tropical_rain.m4a') },
      waterfall: { name: 'Waterfall', listed: true, icon: require('@assets/images/icons/nature/waterfall.jpeg'), audio: require('@assets/sounds/nature/waterfall.m4a') },
      windstorm: { name: 'Windstorm', icon: require('@assets/images/icons/nature/windstorm.jpeg'), audio: require('@assets/sounds/nature/windstorm.m4a') },
    },
  },
  household: {
    title: 'Household',
    sounds: {
      air_conditioner: { name: 'Air Conditioner', listed: true, icon: require('@assets/images/icons/household/air_conditioner.jpeg'), audio: require('@assets/sounds/household/air_conditioner.m4a') },
    },
  },
  calm: {
    title: 'Calm',
    sounds: {
      binaural_beats_theta: { name: 'Binaural Beats (Theta)', listed: true, icon: require('@assets/images/icons/calm/binaural_beats_theta.jpeg'), audio: require('@assets/sounds/calm/binaural_beats_theta.m4a') },
    },
  },
  urban: {
    title: 'Urban',
    sounds: {
      bar_ambience: { name: 'Bar Ambience', listed: true, icon: require('@assets/images/icons/urban/bar_ambience.jpeg'), audio: require('@assets/sounds/urban/bar_ambience.m4a') },
    },
  },
  sleep: {
    title: 'Sleep',
    sounds: {
      delta_waves: { name: 'Delta Waves', icon: require('@assets/images/icons/sleep/delta_waves.jpeg'), audio: require('@assets/sounds/sleep/delta_waves.m4a') },
    },
  },
  focus: {
    title: 'Focus',
    sounds: {
      brown_noise_focus: { name: 'Brown Noise Focus', icon: require('@assets/images/icons/focus/brown_noise_focus.jpeg'), audio: require('@assets/sounds/focus/brown_noise_focus.m4a') },
    },
  },
};

// Keep the existing SOUNDS.nature.blizzard.audio API used by sound players.
export const SOUNDS = Object.fromEntries(
  Object.entries(SOUND_CATALOG).map(([categoryId, category]) => [
    categoryId,
    Object.fromEntries(
      Object.entries(category.sounds).map(([soundId, { icon, audio }]) => [soundId, { icon, audio }]),
    ),
  ]),
) as Record<string, Record<string, SoundAsset>>;

const CATEGORIES: Category[] = Object.entries(SOUND_CATALOG).map(([id, category]) => ({
  id,
  title: category.title,
  sounds: Object.entries(category.sounds)
    .filter(([, sound]) => sound.listed)
    .map(([soundId, sound]): SoundItem => ({
      id: soundId,
      name: sound.name,
      icon: sound.icon,
      sound: sound.audio,
    })),
})).filter((category) => category.sounds.length > 0);

export default CATEGORIES;
