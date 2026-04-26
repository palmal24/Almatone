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

export type SoundAsset = {
  icon: number;
  audio: number;
};

export type SoundCategory = Record<string, SoundAsset>;

export type SoundsLibrary = Record<string, SoundCategory>;