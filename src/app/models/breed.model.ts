export interface CatBreed {
  id: string;
  name: string;  
}

export interface CatBreedImage extends CatBreed {
  url: string;
  description: string;
}