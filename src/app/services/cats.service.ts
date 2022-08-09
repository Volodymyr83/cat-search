import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { Breed } from '../interfaces/breed.interface';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  private apiKey: string = 'c4aebe08-8e5e-48d7-8a2d-65d9b3801f22';
  private apiURL: string = 'https://api.thecatapi.com/v1';
  private breedsURL: string = this.apiURL + '/breeds';
  private imagesURL: string = this.apiURL + '/images/search';

  constructor(private http: HttpClient) { }

  public getBreeds(): Observable<any[]> {
    return this.http.get<any[]>(this.breedsURL).pipe(
      tap(() => console.log('fetched breeds')),
    )
  }

  public getBreedImages(selectedBreed: Breed, limit: number): Observable<any[]> {    
    const url = `${this.imagesURL}?limit=${limit}&breed_ids=${selectedBreed.id}&api_key=${this.apiKey}`;
    // console.log(url);
    return this.http.get<any[]>(url).pipe(
      tap(() => console.log(`fetched ${selectedBreed.name} cat images`)),
    )
  }

  public getAllBreedsImages(limit: number): Observable<any[]> {
    const url = `${this.imagesURL}?limit=${limit}&has_breeds=1&api_key=${this.apiKey}`;
    return this.http.get<any[]>(url).pipe(
      tap(() => console.log('fetched random cat images')),
    )
  }
}
