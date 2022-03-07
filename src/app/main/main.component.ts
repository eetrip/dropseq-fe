import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  checkBoxSelctedValue: any[] = [];
  dropDownSelctedValue: any[] = [];

  ngOnInit(): void {
    this.init();
  }

  init = () => {};

  checkBoxValue = (evt: any) => {
    this.checkBoxSelctedValue = [];
    setTimeout(() => {
      this.checkBoxSelctedValue = evt;
    }, 100);
  };

  dropDownValue = (evt: any) => {
    this.dropDownSelctedValue = evt;
  };
}
