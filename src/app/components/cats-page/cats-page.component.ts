import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBreeds, selectCatsImages } from 'src/app/state/catPage/cats-page.selector';
import { loadBreeds, loadAllBreedsImages, loadOneBreedImages } from '../../state/catPage/cats-page.actions';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cats-page',
  templateUrl: './cats-page.component.html',
  styleUrls: ['./cats-page.component.scss']
})
export class CatsPageComponent implements OnInit {
  public breeds$ = this.store.select(selectBreeds);  
  public catsImages$ = this.store.select(selectCatsImages);
  filterForm = new FormGroup({
    selectedBreedName: new FormControl('All breeds'),  
    limit: new FormControl(10),
  });

  constructor(   
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadBreeds());
    this.store.dispatch(loadAllBreedsImages({limit: this.filterForm.value.limit}));
  }  

  filterBreeds(): void {    
    if (this.filterForm.value.selectedBreedName === 'All breeds') {
      this.store.dispatch(loadAllBreedsImages({limit: this.filterForm.value.limit}))
    } else {      
      this.breeds$.subscribe(breeds => {
        const breed = breeds.find(breed => breed.name === this.filterForm.value.selectedBreedName)!;
        this.store.dispatch(loadOneBreedImages({breed, limit: this.filterForm.value.limit}));
      })
    }
  }
}
