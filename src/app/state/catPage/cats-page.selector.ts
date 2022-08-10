import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CatPageState } from "./cats-api.reducer";

export const selectCatsPage = (state: AppState) => state.catsPage as CatPageState;

export const selectBreeds = createSelector(
  selectCatsPage,
  (state: CatPageState) => state.breeds,
);

export const selectCatsImages = createSelector(
  selectCatsPage,
  (state: CatPageState) => state.catsImages,
);