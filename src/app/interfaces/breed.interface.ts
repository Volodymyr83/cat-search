export interface Breed {
  id: string;
  name: string;  
}

export interface BreedImage extends Breed {
  url: string;
  description: string;
}