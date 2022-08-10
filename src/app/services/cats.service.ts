import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { CatBreed, CatBreedImage } from '../models/breed.model';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private apiKey: string = 'c4aebe08-8e5e-48d7-8a2d-65d9b3801f22';
  private apiURL: string = 'https://api.thecatapi.com/v1';
  private breedsURL: string = this.apiURL + '/breeds';
  private imagesURL: string = this.apiURL + '/images/search';

  constructor(private http: HttpClient) { }

  public getBreeds(): Observable<CatBreed[]> {
    return this.http.get<any[]>(this.breedsURL).pipe(
      tap(() => console.log('fetched breeds')),
      map(data => data.map(item => ({id: item.id, name: item.name}))),      
    )
  }

  public getOneBreedImages(selectedBreed: CatBreed, limit: number): Observable<CatBreedImage[]> {    
    const url = `${this.imagesURL}?limit=${limit}&breed_ids=${selectedBreed.id}&api_key=${this.apiKey}`;
    return this.http.get<any[]>(url).pipe(
      tap(() => console.log(`fetched ${selectedBreed.name} cat images`)),
      map(data => data.map(item => (
        {
          id: item.breeds[0].id,
          name: item.breeds[0].name,
          description: item.breeds[0].description,
          url: item.url,
        }
      ))),
    )
  }

  public getAllBreedsImages(limit: number): Observable<CatBreedImage[]> {
    const url = `${this.imagesURL}?limit=${limit}&has_breeds=1&api_key=${this.apiKey}`;
    return this.http.get<any[]>(url).pipe(
      tap(() => console.log('fetched random cat images')),
      map(data => data.map(item => (
        {
          id: item.breeds[0].id,
          name: item.breeds[0].name,
          description: item.breeds[0].description,
          url: item.url,
        }
      ))),
    )
  }
}
