import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  protected subs = new SubSink();
  @Output() dropDownValue = new EventEmitter<any>();
  @Output() checkBoxValue = new EventEmitter<any>();
  checkBox: any[] = [];
  checkBoxSelectedArray: any[] = [];
  selectedOption: any = '';
  options: any[] = [];
  dropDownPage: number = 1;
  loading: boolean = false;
  dropDownSearchApi: any;

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  init = () => {
    this.apiCalls();
  };

  apiCalls = () => {
    this.spinner.show();
    const dropDownParam = {
      page: this.dropDownPage,
      limit: 20,
    };
    const checkBox = this.apiService.getCheckBox();
    const dropDown = this.apiService.getDropdown(dropDownParam);
    this.subs.add(
      forkJoin([checkBox, dropDown]).subscribe((results) => {
        this.checkBox = results[0];
        this.options = results[1];
        setTimeout(() => {
          this.selectAllCheckBox();
          this.spinner.hide();
        }, 10);
      })
    );
  };

  selectAllCheckBox = () => {
    let checkboxes =
      document.querySelectorAll<HTMLInputElement>('.form-check-input');
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].click();
    }
  };

  dropDownValueChanged = (evt: any) => {
    this.dropDownValue.emit(this.selectedOption);
  };

  checkBoxChecked = (evt: any) => {
    if (evt.target.checked === true) {
      this.checkBoxSelectedArray.push(evt.target.value);
    } else {
      this.checkBoxSelectedArray = this.checkBoxSelectedArray.filter(
        (val) => val !== evt.target.value
      );
    }

    this.checkBoxValue.emit(this.checkBoxSelectedArray);
  };

  customSearchFn = (term: string, item: any) => {
    term = term.toLowerCase();
    return item.toLowerCase().indexOf(term) > -1 || item.toLowerCase() === term;
  };

  searchDropDown = (event: any) => {
    const dropDownParam = {
      limit: 20,
      keyword: event.target.value,
    };
    this.dropDownSearchApi != undefined
      ? this.dropDownSearchApi.unsubscribe()
      : null;
    this.spinner.show();
    this.subs.add(
      (this.dropDownSearchApi = this.apiService
        .getDropdown(dropDownParam)
        .subscribe((res: any) => {
          this.dropDownPage = 1;
          this.options = res;
          this.spinner.hide();
        }))
    );
  };

  scrollToEnd = (evt: any) => {
    this.loading = true;
    this.spinner.show();
    this.dropDownPage += 1;
    const dropDownParam = {
      page: this.dropDownPage,
      limit: 10,
    };

    this.subs.add(
      this.apiService.getDropdown(dropDownParam).subscribe((res: any) => {
        for (let i = 0; i < res.length; i++) {
          this.options = this.options.concat(res[i]);
        }
        this.spinner.hide();
        this.loading = false;
      })
    );
  };
}
