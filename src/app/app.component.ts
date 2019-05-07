import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lab32';
  array: number[][];
  proffesions: string[];
  candidates: string[];
  proffesionData: number[][];
  candidateData: number[][];
  resultData: number[][];
  showResult: boolean;
  chartData: any[];
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Кандидати';
  showYAxisLabel = false;
  view: any[] = [700, 400];
  roundDomains = true;

  constructor() {
  }

  ngOnInit(): void {
    this.proffesions = ['Менеджер', 'Програміст', 'Шофер', 'Референт', 'Перекладач'];
    this.candidates = ['Кандидат1', 'Кандидат2', 'Кандидат3', 'Кандидат4', 'Кандидат5'];
    this.showResult = false;

    this.proffesionData = new Array(5);
    for (let i = 0; i < this.proffesionData.length; i++) {
      this.proffesionData[i] = new Array(10);
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.proffesionData.length; i++) {
      for (let j = 0; j < this.proffesionData[i].length; j++) {
        this.proffesionData[i][j] = Number(Math.random().toFixed(1));
      }
    }

    this.candidateData = new Array(5);
    for (let i = 0; i < this.candidateData.length; i++) {
      this.candidateData[i] = new Array(10);
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.candidateData.length; i++) {
      for (let j = 0; j < this.candidateData[i].length; j++) {
        this.candidateData[i][j] = Number(Math.random().toFixed(1));
      }
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  applyChanges(i: number, j: number): void {
    this.array[j][i] = 1 / this.array[i][j];
  }

  transpondMatrix(matrix: number[][]): number[][] {
    let result: number[][];
    result = new Array(matrix[0].length);
    for (let i = 0; i < result.length; i++) {
      result[i] = new Array(matrix.length);
    }
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        result[j][i] = matrix[i][j];
      }
    }
    return result;
  }

  maxMin(): void {
    const candidateData = this.transpondMatrix(this.candidateData);
    this.resultData = new Array(this.proffesionData.length);
    for (let i = 0; i < this.resultData.length; i++) {
      this.resultData[i] = new Array(this.candidateData.length);
    }
    const temp: number[] = Array(this.proffesionData[0].length);
    for (let i = 0; i < this.resultData.length; i++) {
      for (let j = 0; j < this.resultData[i].length; j++) {
        for (let k = 0; k < this.proffesionData[i].length; k++) {
          temp[k] = Math.min(this.proffesionData[i][k], candidateData[k][j]);
        }
        this.resultData[i][j] = Math.max(...temp);
      }
    }
    this.chartData = Array(this.resultData.length);
    for (let i = 0; i < this.resultData.length; i++) {
      this.chartData[i] = new Object({
        name: this.candidates[i],
        series: new Array(this.resultData[i].length),
      });
      for (let j = 0; j < this.resultData[i].length; j++) {
        this.chartData[i].series[j] = new Object({
          name: this.proffesions[j],
          value: this.resultData[i][j],
        });
      }
    }
    this.showResult = true;
  }

  maxProd(): void {
    const candidateData = this.transpondMatrix(this.candidateData);
    this.resultData = new Array(this.proffesionData.length);
    for (let i = 0; i < this.resultData.length; i++) {
      this.resultData[i] = new Array(this.candidateData.length);
    }
    const temp: number[] = Array(this.proffesionData[0].length);
    for (let i = 0; i < this.resultData.length; i++) {
      for (let j = 0; j < this.resultData[i].length; j++) {
        for (let k = 0; k < this.proffesionData[i].length; k++) {
          temp[k] = Number((this.proffesionData[i][k] * candidateData[k][j]).toFixed(2));
        }
        this.resultData[i][j] = Math.max(...temp);
      }
    }
    this.chartData = Array(this.resultData.length);
    for (let i = 0; i < this.resultData.length; i++) {
      this.chartData[i] = new Object({
        name: this.candidates[i],
        series: new Array(this.resultData[i].length),
      });
      for (let j = 0; j < this.resultData[i].length; j++) {
        this.chartData[i].series[j] = new Object({
          name: this.proffesions[j],
          value: this.resultData[i][j],
        });
      }
    }
    this.showResult = true;
  }
}
