export type SoundItem = {
  id: string;
  name: string;
  icon: number;
  sound: number;
};

export type Category = {
  id: string;
  title: string;
  sounds: SoundItem[];
};