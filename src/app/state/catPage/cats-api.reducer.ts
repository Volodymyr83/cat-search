import { createReducer, on } from "@ngrx/store";
import { CatBreed, CatBreedImage } from "../../models/breed.model";
import { breedsLoaded, catsImagesLoaded } from "./cats-api.actions";

export interface CatPageState {
  breeds: CatBreed[];
  catsImages: CatBreedImage[];
}

export const initialState: CatPageState = {
  breeds: [],
  catsImages: [],
};

export const catsApiReducer = createReducer(
  initialState,  
  on(breedsLoaded, (state, action) => {
    return {
      ...state,
      breeds: action.breeds,
    }
  }),
  on(catsImagesLoaded, (state, action) => {
    return {
      ...state,
      catsImages: action.images,
    }
  }),
);