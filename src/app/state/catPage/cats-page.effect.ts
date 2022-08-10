import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { breedsLoaded, catsImagesLoaded } from './cats-api.actions';
import { loadBreeds, loadAllBreedsImages, loadOneBreedImages } from './cats-page.actions';
import { CatsService } from 'src/app/services/cats.service';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class CatsApiEffects {
  constructor(
    private action$: Actions,    
    private catsService: CatsService,
  ) { }

  loadBreeds$ = createEffect(() => 
    this.action$.pipe(
      ofType(loadBreeds),
      switchMap(() =>
        this.catsService.getBreeds().pipe(
          map((breeds) => breedsLoaded({breeds})),
        )
      )
    )
  );

  loadAllBreedsImages$ = createEffect(() => 
    this.action$.pipe(
      ofType(loadAllBreedsImages),
      switchMap(({limit}) =>
        this.catsService.getAllBreedsImages(limit).pipe(
          map((images) => catsImagesLoaded({images})),
        )
      )
    )
  );

  loadOneBreedImages$ = createEffect(() => 
    this.action$.pipe(
      ofType(loadOneBreedImages),
      switchMap(({breed, limit}) =>
        this.catsService.getOneBreedImages(breed, limit).pipe(
          map((images) => catsImagesLoaded({images})),
        )
      )
    )
  );
}