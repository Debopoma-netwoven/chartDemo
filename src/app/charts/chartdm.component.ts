import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LineChartComponent implements OnInit {
  @ViewChild("linechart") private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  private margin: any = { top: 30, bottom: 30, left: 30, right: 30 };
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScaleA: any;
  private yScaleB: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  private xDomain: Array<number> = [0, 100];
  private yDomainA: Array<number> = [0, 60];
  private yDomainB: Array<number> = [0, 100];

  private datasetA: Array<any> = [
    { "x": 10, "y": 5 },
    { "x": 20, "y": 12 },
    { "x": 30, "y": 20 },
    { "x": 40, "y": 10 },
    { "x": 50, "y": 40 },
    { "x": 60, "y": 30 },
    { "x": 70, "y": 50 },
    { "x": 80, "y": 40 },
    { "x": 90, "y": 55 },
  ];

  private datasetB: Array<any> = [
    { "x": 10, "y": 45 },
    { "x": 20, "y": 45 },
    { "x": 30, "y": 55 },
    { "x": 40, "y": 48 },
    { "x": 50, "y": 75 },
    { "x": 60, "y": 40 },
    { "x": 70, "y": 50 },
    { "x": 80, "y": 40 },
    { "x": 90, "y": 60 },
  ];

  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleLinear().domain(this.xDomain).range([0, this.width, 0]);
    this.yScaleA = d3.scaleLinear().domain(this.yDomainA).range([this.height, 0]);
    this.yScaleB = d3.scaleLinear().domain(this.yDomainB).range([this.height, 0]);

    let lineA = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y((d: any) => this.yScaleA(d.y));

    let lineB = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y((d: any) => this.yScaleB(d.y));
      //.curve(d3.curveCardinal);

    let svg = d3.select(element).append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale));

    svg.append("g")
      .attr("class", "ya axis")
      .call(d3.axisLeft(this.yScaleA));

    svg.append("g")
      .attr("class", "yb axis")
      .attr("transform", "translate( " + this.width + ", 0 )")
      .call(d3.axisRight(this.yScaleB));

    svg.append("path")
      .datum(this.datasetA)
      .attr("class", "lineA")
      .attr("d", lineA);

    svg.append("path")
      .datum(this.datasetB)
      .attr("class", "lineB")
      .attr("d", lineB);

    svg.selectAll(".dotA")
      .data(this.datasetA)
      .enter()
      .append("circle")
      .attr("class", "dotA")
      .attr("cx", d => this.xScale(d.x))
      .attr("cy", d => this.yScaleA(d.y))
      .attr("r", 5)
      .on("mouseover", d => {
        d3.select(d3.event.currentTarget).style("fill", "black");
      })
      .on("mouseout", d => {
        d3.select(d3.event.currentTarget).style("fill", "#EA700D");
      })
      .on("click", d => {
        alert(`X:${d.x} & Y:${d.y}`);
      })

    svg.selectAll(".dotB")
      .data(this.datasetB)
      .enter()
      .append("circle")
      .attr("class", "dotB")
      .attr("cx", d => this.xScale(d.x))
      .attr("cy", d => this.yScaleB(d.y))
      .attr("r", 5)
      .on("mouseover", d => {
        d3.select(d3.event.currentTarget).style("fill", "black");
      })
      .on("mouseout", d => {
        d3.select(d3.event.currentTarget).style("fill", "#31859B");
      })
      .on("click", d => {
        alert(`X:${d.x} & Y:${d.y}`);
      })

  }
}
