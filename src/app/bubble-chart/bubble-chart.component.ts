import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as d3Scale from 'd3-scale';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css'],
})
export class BubbleChartComponent implements OnInit {
  protected subs = new SubSink();
  private _dropDownValue: any;
  chartApi: any;

  @Input() set dropDownValue(value: any) {
    this._dropDownValue = value;
    this.updateGraph();
  }

  get dropDownValue(): any {
    return this._dropDownValue;
  }

  private _checkBoxValue: any;

  @Input() set checkBoxValue(value: any) {
    this._checkBoxValue = value;
    this.updateGraph();
  }

  get checkBoxValue(): any {
    return this._checkBoxValue;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  bubbleData: any[] = [];

  view: any = [innerWidth / 1.7, 600];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  schemeType: string = 'linear';
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Cell Types';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Gene';
  maxRadius: number = 20;
  minRadius: number = 4;
  yScaleMin: number = 70;
  yScaleMax: number = 85;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'c',
  };

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {}

  onResize(event: any) {
    if (
      event.target.innerWidth == parseInt('800px') ||
      event.target.innerWidth < parseInt('800px')
    ) {
      this.view = [event.target.innerWidth / 1.35, 400];
    } else {
      this.view = [event.target.innerWidth / 1.7, 600];
    }
  }

  updateGraph = () => {
    if (this._dropDownValue.length > 1) {
      this.chartApi != undefined ? this.chartApi.unsubscribe() : null;
      const params = {
        gene: this._dropDownValue,
        cells: this._checkBoxValue,
      };
      this.spinner.show();
      this.subs.add(
        (this.chartApi = this.apiService
          .getGraphData(params)
          .subscribe((resp: any) => {
            this.bubbleData = [];
            this.bubbleData = resp;
            this.spinner.hide();
          }))
      );
    } else {
      this.bubbleData = [];
    }
  };

  onSelect(data: any): void {}

  onActivate(data: any): void {}

  onDeactivate(data: any): void {}
}
