import type { Category } from '../types/sound';

export const SOUNDS = {
  nature: {
    blizzard:        { icon: require('@assets/images/icons/nature/blizzard.jpeg'),        audio: require('@assets/sounds/nature/blizzard.m4a') },
    campfire:        { icon: require('@assets/images/icons/nature/campfire.jpeg'),        audio: require('@assets/sounds/nature/campfire.m4a') },
    cave_drips:      { icon: require('@assets/images/icons/nature/cave_drips.jpeg'),      audio: require('@assets/sounds/nature/cave_drips.m4a') },
    cricket_night:   { icon: require('@assets/images/icons/nature/cricket_night.jpeg'),   audio: require('@assets/sounds/nature/cricket_night.m4a') },
    forest_birds:    { icon: require('@assets/images/icons/nature/forest_birds.jpeg'),    audio: require('@assets/sounds/nature/forest_birds.m4a') },
    gentle_rain:     { icon: require('@assets/images/icons/nature/gentle_rain.jpeg'),     audio: require('@assets/sounds/nature/gentle_rain.m4a') },
    howling_wind:    { icon: require('@assets/images/icons/nature/howling_wind.jpeg'),    audio: require('@assets/sounds/nature/howling_wind.m4a') },
    light_rain:      { icon: require('@assets/images/icons/nature/light_rain.jpeg'),      audio: require('@assets/sounds/nature/light_rain.m4a') },
    lightning_strikes: { icon: require('@assets/images/icons/nature/lighting_strikes.jpeg'), audio: require('@assets/sounds/nature/lighting_strikes.m4a') },
    ocean_waves:     { icon: require('@assets/images/icons/nature/ocean_waves.jpeg'),     audio: require('@assets/sounds/nature/ocean_waves.m4a') },
    rain_dripping:   { icon: require('@assets/images/icons/nature/rain_dripping.jpeg'),   audio: require('@assets/sounds/nature/rain_dripping.m4a') },
    rain_tent:       { icon: require('@assets/images/icons/nature/rain_tent.jpeg'),       audio: require('@assets/sounds/nature/rain_tent.m4a') },
    river_flow:      { icon: require('@assets/images/icons/nature/river_flow.jpeg'),      audio: require('@assets/sounds/nature/river_flow.m4a') },
    rustling_leaves: { icon: require('@assets/images/icons/nature/rustling_leaves.jpeg'), audio: require('@assets/sounds/nature/rustling_leaves.m4a') },
    thunderstorm:    { icon: require('@assets/images/icons/nature/thunderstorm.jpeg'),    audio: require('@assets/sounds/nature/thunderstorm.m4a') },
    tropical_rain:   { icon: require('@assets/images/icons/nature/tropical_rain.jpeg'),   audio: require('@assets/sounds/nature/tropical_rain.m4a') },
    waterfall:       { icon: require('@assets/images/icons/nature/waterfall.jpeg'),       audio: require('@assets/sounds/nature/waterfall.m4a') },
    windstorm:       { icon: require('@assets/images/icons/nature/windstorm.jpeg'),       audio: require('@assets/sounds/nature/windstorm.m4a') },
  },

  household: {
    air_conditioner: { icon: require('@assets/images/icons/household/air_conditioner.jpeg'), audio: require('@assets/sounds/household/air_conditioner.m4a') },
    // boiling_kettle:  { icon: require('@assets/images/icons/household/boiling_kettle.jpeg'),  audio: require('@assets/sounds/household/boiling_kettle.m4a') },
    // clock_ticking:   { icon: require('@assets/images/icons/household/clock_ticking.jpeg'),   audio: require('@assets/sounds/household/clock_ticking.m4a') },
    // coffee_machine:  { icon: require('@assets/images/icons/household/coffee_machine.jpeg'),  audio: require('@assets/sounds/household/coffee_machine.m4a') },
    // electric_fan:    { icon: require('@assets/images/icons/household/electric_fan.jpeg'),    audio: require('@assets/sounds/household/electric_fan.m4a') },
    // fireplace:       { icon: require('@assets/images/icons/household/fireplace.jpeg'),       audio: require('@assets/sounds/household/fireplace.m4a') },
    // hair_dryer:      { icon: require('@assets/images/icons/household/hair_dryer.jpeg'),      audio: require('@assets/sounds/household/hair_dryer.m4a') },
    // vacuum_cleaner:  { icon: require('@assets/images/icons/household/vacuum_cleaner.jpeg'),  audio: require('@assets/sounds/household/vacuum_cleaner.m4a') },
    // washing_machine: { icon: require('@assets/images/icons/household/washing_machine.jpeg'), audio: require('@assets/sounds/household/washing_machine.m4a') },
  },

  calm: {
    binaural_beats_theta:  { icon: require('@assets/images/icons/calm/binaural_beats_theta.jpeg'),  audio: require('@assets/sounds/calm/binaural_beats_theta.m4a') },
    // brown_noise:     { icon: require('@assets/images/icons/calm/brown_noise.jpeg'),     audio: require('@assets/sounds/calm/brown_noise.m4a') },
    // om_chanting:     { icon: require('@assets/images/icons/calm/om_chanting.jpeg'),     audio: require('@assets/sounds/calm/om_chanting.m4a') },
    // pink_noise:      { icon: require('@assets/images/icons/calm/pink_noise.jpeg'),      audio: require('@assets/sounds/calm/pink_noise.m4a') },
    // tibetan_bowls:   { icon: require('@assets/images/icons/calm/tibetan_bowls.jpeg'),   audio: require('@assets/sounds/calm/tibetan_bowls.m4a') },
    // white_noise:     { icon: require('@assets/images/icons/calm/white_noise.jpeg'),     audio: require('@assets/sounds/calm/white_noise.m4a') },
  },

  urban: {
    bar_ambience:    { icon: require('@assets/images/icons/urban/bar_ambience.jpeg'),    audio: require('@assets/sounds/urban/bar_ambience.m4a') },
    // coffee_shop:     { icon: require('@assets/images/icons/urban/coffee_shop.jpeg'),     audio: require('@assets/sounds/urban/coffee_shop.m4a') },
    // library:         { icon: require('@assets/images/icons/urban/library.jpeg'),         audio: require('@assets/sounds/urban/library.m4a') },
    // night_city:      { icon: require('@assets/images/icons/urban/night_city.jpeg'),      audio: require('@assets/sounds/urban/night_city.m4a') },
    // rain_on_window:  { icon: require('@assets/images/icons/urban/rain_on_window.jpeg'),  audio: require('@assets/sounds/urban/rain_on_window.m4a') },
    // subway_rumble:   { icon: require('@assets/images/icons/urban/subway_rumble.jpeg'),   audio: require('@assets/sounds/urban/subway_rumble.m4a') },
    // train_ride:      { icon: require('@assets/images/icons/urban/train_ride.jpeg'),      audio: require('@assets/sounds/urban/train_ride.m4a') },
  },

  sleep: {
    delta_waves:     { icon: require('@assets/images/icons/sleep/delta_waves.jpeg'),     audio: require('@assets/sounds/sleep/delta_waves.m4a') },
    // heartbeat:       { icon: require('@assets/images/icons/sleep/heartbeat.jpeg'),       audio: require('@assets/sounds/sleep/heartbeat.m4a') },
    // lullaby_box:     { icon: require('@assets/images/icons/sleep/lullaby_box.jpeg'),     audio: require('@assets/sounds/sleep/lullaby_box.m4a') },
    // rain_on_roof:    { icon: require('@assets/images/icons/sleep/rain_on_roof.jpeg'),    audio: require('@assets/sounds/sleep/rain_on_roof.m4a') },
    // womb_sounds:     { icon: require('@assets/images/icons/sleep/womb_sounds.jpeg'),     audio: require('@assets/sounds/sleep/womb_sounds.m4a') },
  },

  focus: {
    brown_noise_focus: { icon: require('@assets/images/icons/focus/brown_noise_focus.jpeg'),     audio: require('@assets/sounds/focus/brown_noise_focus.m4a') },
    // coffee_shop_focus: { icon: require('@assets/images/icons/focus/coffee_shop.jpeg'),     audio: require('@assets/sounds/focus/coffee_shop.m4a') },
    // keyboard_typing:   { icon: require('@assets/images/icons/focus/keyboard_typing.jpeg'), audio: require('@assets/sounds/focus/keyboard_typing.m4a') },
    // white_noise_focus: { icon: require('@assets/images/icons/focus/white_noise.jpeg'),     audio: require('@assets/sounds/focus/white_noise.m4a') },
  },
};

const CATEGORIES: Category[] = [
  {
    id: 'nature',
    title: 'Nature',
    sounds: [
      {
        id: 'gentle_rain',
        name: 'Gentle Rain',
        icon: SOUNDS.nature.gentle_rain.icon,
        sound: SOUNDS.nature.gentle_rain.audio,
      },
      {
        id: 'ocean_waves',
        name: 'Ocean Waves',
        icon: SOUNDS.nature.ocean_waves.icon,
        sound: SOUNDS.nature.ocean_waves.audio,
      },
      {
        id: 'river_flow',
        name: 'River Flow',
        icon: SOUNDS.nature.river_flow.icon,
        sound: SOUNDS.nature.river_flow.audio,
      },
      {
        id: 'blizzard',
        name: 'Blizzard',
        icon: SOUNDS.nature.blizzard.icon,
        sound: SOUNDS.nature.blizzard.audio,
      },
      {
        id: 'campfire',
        name: 'Campfire',
        icon: SOUNDS.nature.campfire.icon,
        sound: SOUNDS.nature.campfire.audio,
      },
    ],
  },
  {
    id: 'calm',
    title: 'Calm',
    sounds: [
      {
        id: 'binaural_beats_theta',
        name: 'Binaural Beats (Theta)',
        icon: SOUNDS.calm.binaural_beats_theta.icon,
        sound: SOUNDS.calm.binaural_beats_theta.audio,
      },
    ],
  },
  {
    id: 'household',
    title: 'Household',
    sounds: [
      {
        id: 'air_conditioner',
        name: 'Air Conditioner',
        icon: SOUNDS.household.air_conditioner.icon,
        sound: SOUNDS.household.air_conditioner.audio,
      },
    ],
  },
  {
    id: 'urban',
    title: 'Urban',
    sounds: [
      {
        id: 'bar_ambience',
        name: 'Bar Ambience',
        icon: SOUNDS.urban.bar_ambience.icon,
        sound: SOUNDS.urban.bar_ambience.audio,
      },
    ],
  },
];

export default CATEGORIES;