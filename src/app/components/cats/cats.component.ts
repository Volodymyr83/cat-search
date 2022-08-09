import { Component, OnInit } from '@angular/core';
import { CatsService } from 'src/app/services/cats.service';
import { Breed, BreedImage } from 'src/app/interfaces/breed.interface';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss']
})
export class CatsComponent implements OnInit {
  breeds: Breed[] = [];  
  breedImages: BreedImage[] = [];
  filterForm = new FormGroup({
    selectedBreedName: new FormControl('All breeds'),  
    limit: new FormControl(10),
  });
  // selectedBreedName: string = 'All breeds';  
  // limitValue: number = 10;

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

    // this.getAllBreedsImages(this.filterForm.value.limit);
  }  

  filterBreeds(): void {
    if (this.filterForm.value.selectedBreedName === 'All breeds') {
      this.getAllBreedsImages(this.filterForm.value.limit);       
    } else {
      const breed = this.breeds.find(breed => breed.name === this.filterForm.value.selectedBreedName)!;
      this.getBreedImages(breed, this.filterForm.value.limit);
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
    this.catsService.getBreedImages(breed, limit)
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
