import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { IData } from '../data.interface';
import { DataService } from '../data.service';
import * as D3 from "d3";

@Component({
  selector: 'app-piecharts',
  templateUrl: './piecharts.component.html',
  styleUrls: ['./piecharts.component.css'],
  providers:[DataService]
})
export class PiechartsComponent implements AfterViewInit {

  @ViewChild("containerPieChart") element: ElementRef;
  
      private host: D3.Selection<any,any,any,any>;
      private svg: D3.Selection<any,any,any,any>;
      private width: number;
      private height: number;
      private radius: number;
      private htmlElement: HTMLElement;
      private pieData: IData[];
  
      constructor(private dataService: DataService) { }
  
      ngAfterViewInit() {
          this.htmlElement = this.element.nativeElement;
          this.host = D3.select(this.htmlElement);
          this.dataService.$data.subscribe(data => {
              this.pieData = data;
              this.setup();
              this.buildSVG();
              this.buildPie();
          });
      }
  
      private setup(): void {
          this.width = 250;
          this.height = 250;
          this.radius = Math.min(this.width, this.height) / 2;
      }
  
      private buildSVG(): void {
          this.host.html("");
          this.svg = this.host.append("svg")
              .attr("viewBox", `0 0 ${this.width} ${this.height}`)
              .append("g")
              .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
      }
  
      private buildPie(): void {
          let pie = D3.pie();
          let values = this.pieData.map(data => data.value);
          let arcSelection = this.svg.selectAll(".arc")
              .data(pie(values))
              .enter()
              .append("g")
              .attr("class", "arc");
              let innerRadius = this.radius - 50;
              let outerRadius = this.radius - 10;
              let pieColor = D3.schemeCategory20;
              let arc = D3.arc<D3.PieArcDatum<number>>()
                  .outerRadius(outerRadius);
              arcSelection.append("path")
                  .attr("d", arc)
                  .attr("fill", (datum, index) => {
                    return pieColor[this.pieData[index].label];
                });
      
              arcSelection.append("text")
                  .attr("transform", (datum: any) => {
                      datum.innerRadius = 0;
                      datum.outerRadius = outerRadius;
                      return "translate(" + arc.centroid(datum) + ")";
                  })
                  .text((datum, index) => this.pieData[index].label)
                  .style("text-anchor", "middle");
          //this.populatePie(arcSelection);
      }
  
      // private populatePie(arcSelection: D3.Selection<any,D3.PieArcDatum<number>,any,any>): void {
        
      //     let innerRadius = this.radius - 50;
      //     let outerRadius = this.radius - 10;
      //     let pieColor = D3.schemeCategory20;
      //     let arc = D3.arc<D3.PieArcDatum<number>>()
      //         .outerRadius(outerRadius);
      //     arcSelection.append("path")
      //         .attr("d", arc)
      //         .attr("fill", (datum, index) => {
      //           return pieColor[this.pieData[index].label];
      //       });
  
      //     arcSelection.append("text")
      //         .attr("transform", (datum: any) => {
      //             datum.innerRadius = 0;
      //             datum.outerRadius = outerRadius;
      //             return "translate(" + arc.centroid(datum) + ")";
      //         })
      //         .text((datum, index) => this.pieData[index].label)
      //         .style("text-anchor", "middle");
      // }
  }
