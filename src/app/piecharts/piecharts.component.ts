import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-piecharts',
  templateUrl: './piecharts.component.html',
  styleUrls: ['./piecharts.component.css'],
  //providers:[DataService]
})
export class PiechartsComponent implements OnInit {
    @ViewChild('chart2') private chartContainer: ElementRef;
   // @Input() private data: Array<any>;
    private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    //private colors: any;
    private xAxis: any;
    private yAxis: any;
    private state:any;
    //private selectedType: string;
    private yScaleA: any;
    private yScaleB: any;
   // private xAxisUpdate: any;
    //private yAxisUpdate: any;
    private pathUpdate: any;
    private lineA: any;
  
    private xDomain: Array<Date> = [new Date('1/1/2007'), new Date()];
    private yDomainA: Array<number> = [0, 60];
    //private yDomainB: Array<number> = [0, 100];
  
    private datasetA: Array<any> = [
      { "x": new Date('1/1/2007'), "y": 60},
      { "x": new Date('3/4/2007'), "y": 59 },
      { "x": new Date('6/5/2007'), "y": 58 },
      { "x": new Date('7/7/2008'), "y": 57 },
      { "x": new Date('9/10/2008'), "y": 56 },
      { "x": new Date('3/4/2009'), "y": 54 },
      { "x": new Date('4/5/2010'), "y": 52 },
      { "x": new Date('11/11/2010'), "y": 51 },
      { "x": new Date('9/3/2011'), "y": 50},
      { "x": new Date('10/8/2011'), "y": 44 },
      { "x": new Date('3/4/2012'), "y": 41 },
      { "x": new Date('5/6/2012'), "y": 39 },
      { "x": new Date('1/1/2013'), "y": 36 },
      { "x": new Date('3/5/2013'), "y": 33 },
      { "x": new Date('8/4/2014'), "y": 31 },
      { "x": new Date('11/11/2015'), "y": 26},
      { "x": new Date('1/3/2016'), "y": 22 },
      { "x": new Date('5/5/2016'), "y": 19},
      { "x": new Date('8/9/2016'), "y": 16 },
      { "x": new Date('5/5/2017'), "y": 12 },
      { "x": new Date('8/8/2017'), "y": 10 },
      { "x": new Date('11/10/2017'), "y": 5 }
    ];
  
   
    constructor() { }
  
    ngOnInit() {
      //debugger;
      this.createChart();
    
    }
  
   
    createChart() {
      //debugger;
      //bar chart
      let element = this.chartContainer.nativeElement;
      this.width =Math.abs(element.offsetWidth - this.margin.left - this.margin.right);
      this.height = Math.abs(element.offsetHeight - this.margin.top - this.margin.bottom);
      let svg = d3.select(element).append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight);
  
      // // chart plot area
      this.chart = svg.append('g')
        .attr('class', 'bars')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  
  
      this.xScale = d3.scaleTime().domain(this.xDomain).range([0, this.width]);
      this.yScaleA = d3.scaleLinear().domain(this.yDomainA).range([this.height, 0]);
      //this.yScaleB = d3.scaleLinear().domain(this.yDomainB).range([this.height, 0]);
  
       this.lineA = d3.line<any>()
        .x((d: any) => this.xScale(d.x))
        .y((d: any) => this.yScaleA(d.y));
  
      
      this.xAxis = this.chart.append("g")
        .attr("class", "x axis disX")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(this.xScale)
        .tickFormat(d3.timeFormat('%x')));
  
    //this.xAxisUpdate = svg.selectAll(".x axis");
  
      this.yAxis = this.chart.append("g")
        .attr("class", "ya axis")
        .attr("transform", "translate(" + Math.abs(this.width + 19).toString() + " ,0)")	
        .call(d3.axisLeft(this.yScaleA));
  
      this.pathUpdate = this.chart.append("path")
        .datum(this.datasetA)
        .attr("class", "lineA")
        .attr("d", this.lineA);
  
  
      this.state=this.chart.selectAll(".dotA")
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
  
        
    }
    updateChartFromButton(value,type,dom)
    {
      
      
      // // update scales & axis
      this.xScale.domain(dom);
     
      this.xAxis.transition().call(d3.axisBottom(this.xScale));
     
      this.lineA = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y((d: any) => this.yScaleA(d.y));
  
      this.pathUpdate.datum(this.datasetA).attr("class", "lineA")
      .attr("d", this.lineA);
  
      //this.pathUpdate.pathUpdate();
  
      var circles = this.chart.selectAll("circle")
      .data(this.datasetA);
      circles.exit().remove();
      //this.pathUpdate.pathUpdate();
  
      let update = this.chart.selectAll('.dotA')
        .data(this.datasetA);
  
      
      update.exit().remove();
      
  
        update
        .data(this.datasetA)
        .enter()
        .append("circle")
        .attr("class", "dotA")
        .merge(update)
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
    }
    updateChart(value,dom) {
      
      
      
      // // update scales & axis
      this.xScale.domain(dom);
     
      this.xAxis.transition().call(d3.axisBottom(this.xScale));
     
      this.lineA = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y((d: any) => this.yScaleA(d.y));
  
      this.pathUpdate.datum(this.datasetA).attr("class", "lineA")
      .attr("d", this.lineA);
  
      var circles = this.chart.selectAll("circle")
      .data(this.datasetA);
      circles.exit().remove();
      //this.pathUpdate.pathUpdate();
  
      let update = this.chart.selectAll('.dotA')
        .data(this.datasetA);
  
      
      update.exit().remove();
      
  
        update
        .data(this.datasetA)
        .enter()
        .append("circle")
        .attr("class", "dotA")
        .merge(update)
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
      
     }
  }
