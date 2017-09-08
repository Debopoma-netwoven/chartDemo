import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation,EventEmitter ,Output} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChartsComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  //@Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  // @Output()
  // changexAxis: EventEmitter<number> = new EventEmitter<any>();
  private yAxis: any;
  private state:any;
 // private selectedType: string;
 
  private yScaleA: any;
  private yScaleB: any;
  //private xAxisUpdate: any;
  //private yAxisUpdate: any;
  private pathUpdate: any;
  private lineA: any;

  private xDomain: Array<Date> = [new Date('1/1/2007'), new Date()];
  private yDomainA: Array<number> = [0, 60];
  //private yDomainB: Array<number> = [0, 100];

  private datasetA: Array<any> = [
    { "x": new Date('1/1/2007'), "y": 5 },
    { "x": new Date('3/4/2008'), "y": 10 },
    { "x": new Date('6/5/2009'), "y": 12 },
    { "x": new Date('7/7/2009'), "y": 18 },
    { "x": new Date('1/1/2010'), "y": 5 },
    { "x": new Date('3/4/2010'), "y": 10 },
    { "x": new Date('6/5/2011'), "y": 12 },
    { "x": new Date('7/7/2011'), "y": 18 },
    { "x": new Date('9/3/2012'), "y": 23 },
    { "x": new Date('10/8/2012'), "y": 26 },
    { "x": new Date('3/4/2013'), "y": 30 },
    { "x": new Date('5/6/2013'), "y": 34 },
    { "x": new Date('1/8/2014'), "y": 39 },
    { "x": new Date('3/1/2014'), "y": 41 },
    { "x": new Date('8/4/2014'), "y": 42 },
    { "x": new Date('8/5/2015'), "y": 46},
    { "x": new Date('9/7/2015'), "y": 49 },
    { "x": new Date('1/3/2016'), "y": 52},
    { "x": new Date('3/4/2016'), "y": 55 },
    { "x": new Date('6/5/2016'), "y": 58 },
    { "x": new Date('2/8/2017'), "y": 59 },
    { "x": new Date('5/10/2017'), "y": 60 }
  ];

 
  constructor() { }

  ngOnInit() {
    //debugger;
    this.createChart();
   
  }

 

  createChart() {
    //debugger;
    
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleTime().domain(this.xDomain).range([0, this.width]);
    this.yScaleA = d3.scaleLinear().domain(this.yDomainA).range([this.height, 0]);

     this.lineA = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y((d: any) => this.yScaleA(d.y));

    this.chart= d3.select(element).append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.xAxis = this.chart.append("g")
      .attr("class", "x axis disX")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale)
      .tickFormat(d3.timeFormat('%x')));


    this.yAxis = this.chart.append("g")
      .attr("class", "ya axis")
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
    
    
    // update scales & axis
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
    
   
    //debugger;
    // update scales & axis
    this.xScale.domain(dom);
   
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    //this.changexAxis.emit(this.xAxis);

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




