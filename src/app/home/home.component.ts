import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IData } from '../data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private chartData: Array<any>;
  data: IData[];
  newLabel: string;
  newValue: number;

  constructor(private dataService: DataService) { }

  addData(): void {
    let newData = {
      label: this.newLabel,
      value: this.newValue
    } as IData;

    this.dataService.addData(newData);
  }
  

  ngOnInit() {
    //debugger;
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
       setInterval(() => this.generateData(), 3000);
     }, 1000);
     this.dataService.$data.subscribe(data => {
      this.data = data;
    });
  }

  generateData() {
    this.chartData = [];
      this.chartData.push([
        new Date('1/1/2015'),
        80
      ]);

      this.chartData.push([
        new Date('1/1/2016'),
        180
      ]);

      this.chartData.push([
        new Date('1/1/2017'),
        76.78
      ]);

    // for (let i = 0; i < (8 +  Math.abs(Math.floor(Math.random() * 10))); i++) {
    //   this.chartData.push([
    //     `Index ${i}`,
    //     Math.abs(Math.floor(Math.random() * 100))
    //   ]);
    // }
  }

}
