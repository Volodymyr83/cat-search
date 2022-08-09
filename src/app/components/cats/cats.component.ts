import { Component, OnInit } from '@angular/core';
import { CatsService } from 'src/app/services/cats.service';
import { Breed, BreedImage } from 'src/app/interfaces/breed.interface';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {
  breeds: Breed[] = [];  
  breedImages: BreedImage[] = [];
  selectedBreedName: string = 'All breeds';
  minimumLimit: number = 10;
  maximumLimit: number = 100;
  limitValue: number = 10;

  constructor(
    private catsService: CatsService,
  ) { }

  ngOnInit(): void {
    this.catsService.getBreeds().subscribe(breeds => {
      this.breeds = breeds.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    });

    // this.getAllBreedsImages(this.limitValue);
  }

  changeSelectedBreed(breedName: string): void {
      this.selectedBreedName = breedName;
  }

  filterBreeds(): void {
    if (this.selectedBreedName === 'All breeds') {
      this.getAllBreedsImages(this.limitValue);       
    } else {
      const breed = this.breeds.find(breed => breed.name === this.selectedBreedName)!;
      this.getBreedImages(breed, this.limitValue);
    }
  }

  getAllBreedsImages(limit: number): void {
    this.catsService.getAllBreedsImages(limit)
      .subscribe(data => {
        this.breedImages = data.map(image => (
          {
            id: image.breeds[0].id,
            name: image.breeds[0].name,
            description: image.breeds[0].description,
            url: image.url,            
          }
        ));
      });
  }

  getBreedImages(breed: Breed, limit: number): void {
    this.catsService.getBreedImages(breed, this.limitValue)
        .subscribe(data => {
          this.breedImages = data.map(image => (
            {
              id: image.breeds[0].id,
              name: image.breeds[0].name,
              description: image.breeds[0].description,
              url: image.url
            }
            ));          
        });
  }
}
