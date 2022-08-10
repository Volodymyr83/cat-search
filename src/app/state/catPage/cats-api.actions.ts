import { createAction, props } from "@ngrx/store";
import { CatBreed, CatBreedImage } from "../../models/breed.model";

export const breedsLoaded = createAction(
  '[Cats API] Breeds Loaded',
  props<{ breeds: CatBreed[] }>(),
);

export const catsImagesLoaded = createAction(
  '[Cats API] Cats Images Loaded',
  props<{ images: CatBreedImage[] }>(),
);

