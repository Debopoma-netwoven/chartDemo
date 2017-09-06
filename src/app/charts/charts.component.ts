import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChartsComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private state:any;
 // private margin: any = { top: 30, bottom: 30, left: 30, right: 30 };
 // private chart: any;
 // private width: number;
  //private height: number;
  //private xScale: any;
  private yScaleA: any;
  private yScaleB: any;
 // private colors: any;
  private xAxisUpdate: any;
  private yAxisUpdate: any;
  private pathUpdate: any;
  private lineA: any;

  private xDomain: Array<Date> = [new Date('1/1/2007'), new Date()];
  private yDomainA: Array<number> = [0, 60];
  private yDomainB: Array<number> = [0, 100];

  private datasetA: Array<any> = [
    { "x": new Date('1/1/2015'), "y": 5 },
    { "x": new Date('3/4/2015'), "y": 12 },
    { "x": new Date('8/5/2016'), "y": 20 },
    { "x": new Date('7/7/2016'), "y": 10 },
    { "x": new Date('6/9/2015'), "y": 40 },
    { "x": new Date('7/8/2016'), "y": 30 },
    { "x": new Date('3/6/2017'), "y": 50 },
    { "x": new Date('2/7/2017'), "y": 40 },
    { "x": new Date('10/4/2017'), "y": 55 },
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
    //debugger;
    this.createChart();
    if (this.data) {
      this.updateChart('');
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart('');
    }
  }
  onChangeEvent({target}){
    //debugger;
    this.updateChart(target.value);
}
  createChart() {
    //debugger;
    //bar chart
    // let element = this.chartContainer.nativeElement;
    // this.width =Math.abs(element.offsetWidth - this.margin.left - this.margin.right);
    // this.height = Math.abs(element.offsetHeight - this.margin.top - this.margin.bottom);
    // let svg = d3.select(element).append('svg')
    //   .attr('width', element.offsetWidth)
    //   .attr('height', element.offsetHeight);

    // // chart plot area
    // this.chart = svg.append('g')
    //   .attr('class', 'bars')
    //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    // // define X & Y domains
    // let xDomain = this.data.map(d => d[0]);
    // let yDomain = [0, d3.max(this.data, d => d[1])];

    // // create scales
    // this.xScale = d3.scaleBand().domain(xDomain).range([0, this.width]);
    // this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // // bar colors
    // this.colors = d3.scaleTime().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // // x & y axis
    // this.xAxis = svg.append('g')
    //   .attr('class', 'axis axis-x')
    //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
    //   .call(d3.axisTop(this.xScale));

    // this.yAxis = svg.append('g')
    //   .attr('class', 'axis axis-y')
    //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
    //   .call(d3.axisLeft(this.yScale));

    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleTime().domain(this.xDomain).range([0, this.width]);
    this.yScaleA = d3.scaleLinear().domain(this.yDomainA).range([this.height, 0]);
    //this.yScaleB = d3.scaleLinear().domain(this.yDomainB).range([this.height, 0]);

     this.lineA = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y((d: any) => this.yScaleA(d.y));

    // let lineB = d3.line<any>()
    //   .x((d: any) => this.xScale(d.x))
    //   .y((d: any) => this.yScaleB(d.y));
      //.curve(d3.curveCardinal);

    this.chart= d3.select(element).append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.xAxis = this.chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale)
      .tickFormat(d3.timeFormat('%x')));

  //this.xAxisUpdate = svg.selectAll(".x axis");

    this.yAxis = this.chart.append("g")
      .attr("class", "ya axis")
      .call(d3.axisLeft(this.yScaleA));

     // this.yAxisUpdate = svg.selectAll(".ya axis");
    // svg.append("g")
    //   .attr("class", "yb axis")
    //   .attr("transform", "translate( " + this.width + ", 0 )")
    //   .call(d3.axisRight(this.yScaleB));

    this.pathUpdate = this.chart.append("path")
      .datum(this.datasetA)
      .attr("class", "lineA")
      .attr("d", this.lineA);

    //this.pathUpdate = this.chart.selectAll(".lineA");
    // svg.append("path")
    //   .datum(this.datasetB)
    //   .attr("class", "lineB")
    //   .attr("d", lineB);

    this.state=this.chart.selectAll(".dotA")
      .data(this.datasetA)
      .enter()
      //.append("circle")
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

  updateChart(value) {
    
    if(value=="2007")
      {
        this.xDomain = [new Date('1/1/2007'), new Date('12/31/2007')];
      }
      else if(value=="2008")
        {
          this.xDomain = [new Date('1/1/2008'), new Date('12/31/2008')];
        }
        else if(value=="2009")
          {
            this.xDomain = [new Date('1/1/2009'), new Date('12/31/2009')];
          }
          else if(value=="2010")
              {
                this.xDomain = [new Date('1/1/2010'), new Date('12/31/2010')];
              }
              else if(value=="2011")
                {
                  this.xDomain = [new Date('1/1/2011'), new Date('12/31/2011')];
                }
                else if(value=="2012")
                  {
                    this.xDomain = [new Date('1/1/2012'), new Date('12/31/2012')];
                  }
                  else if(value=="2013")
                    {
                      this.xDomain = [new Date('1/1/2013'), new Date('12/31/2013')];
                    }
                    else if(value=="2014")
                      {
                        this.xDomain = [new Date('1/1/2014'), new Date('12/31/2014')];
                      }
                      else if(value=="2015")
                        {
                          this.xDomain = [new Date('1/1/2015'), new Date('12/31/2015')];
                        }
                        else if(value=="2016")
                          {
                            this.xDomain = [new Date('1/1/2016'), new Date('12/31/2016')];
                          }
                          else if(value=="2017")
                            {
                              this.xDomain = [new Date('1/1/2017'), new Date('12/31/2017')];
                            }
                            else if(value=="last3")
                              {
                                this.xDomain = [new Date('1/1/2015'), new Date('12/31/2017')];
                              }
                              else if(value=="last5")
                                {
                                  this.xDomain = [new Date('1/1/2012'), new Date('12/31/2017')];
                                }
                                else if(value=="last10")
                                  {
                                    this.xDomain = [new Date('1/1/2007'), new Date('12/31/2017')];
                                  }
                            //debugger;
    
    // update scales & axis
    this.xScale.domain(this.xDomain);
   
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
   
    this.lineA = d3.line<any>()
    .x((d: any) => this.xScale(d.x))
    .y((d: any) => this.yScaleA(d.y));

    this.pathUpdate.datum(this.datasetA).attr("class", "lineA")
    .attr("d", this.lineA);

    this.pathUpdate.pathUpdate();

    let update = this.chart.selectAll('.dotA')
      .data(this.datasetA);

    // remove exiting bars
    update.exit().remove();


      update
      .data(this.datasetA)
      .enter()
      //.append("circle")
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
}




