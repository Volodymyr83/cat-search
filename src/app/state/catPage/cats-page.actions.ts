import { createAction, props } from "@ngrx/store";
import { CatBreed } from "../../models/breed.model";

export const loadBreeds = createAction(
  '[Cats Page] Load Breeds',
);

export const loadAllBreedsImages = createAction(
  '[Cats Page] Load All Breeds Images',
  props<{limit: number}>()
);

export const loadOneBreedImages = createAction(
  '[Cats Page] Load One Breed Images',
  props<{breed: CatBreed, limit: number}>(),
);