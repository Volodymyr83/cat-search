import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Breed } from 'src/app/interfaces/breed.interface';

@Component({
  selector: 'app-breed-checkbox',
  templateUrl: './breed-checkbox.component.html',
  styleUrls: ['./breed-checkbox.component.scss']
})
export class BreedCheckboxComponent implements OnInit {
  @Input() breed!: Breed;
  @Output() onCheck = new EventEmitter();
  checkboxValue: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  clickCheckbox(): void {
    this.onCheck.emit(!this.checkboxValue);
  }

}
