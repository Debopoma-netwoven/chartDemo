import { Component, OnInit,ElementRef,ViewChild,Input,ViewEncapsulation } from '@angular/core';
//import { DataService } from '../data.service';
//import { IData } from '../data.interface';
import * as d3 from 'd3';
import { ChartsComponent } from '../charts/charts.component';
import { PiechartsComponent } from '../piecharts/piecharts.component';
import {MenuModule,MenuItem} from 'primeng/primeng';
//import { MomentModule } from 'angular2-moment';
//import { Moment } from 'moment/moment';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private chartData: Array<any>;
  //data: IData[];
  // newLabel: string;
  // newValue: number;
  @ViewChild('chartParent') private chartContainer: ElementRef;
  //@Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chartParent: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScaleA: any;
  private xAxis: any;
  private yAxis: any;
  private pathUpdate: any;
  private lineA: any;
  private selectedType: string;
  private xDomain: Array<Date> = [new Date('1/1/2007'), new Date()];
  private yDomainA: Array<number> = [0, 60];
  @ViewChild(ChartsComponent) childChart:ChartsComponent;
  @ViewChild(PiechartsComponent) childPie:PiechartsComponent;
  items: MenuItem[];
  constructor() { }

  ngOnInit() {
    
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = 450;//element.offsetHeight - this.margin.top - this.margin.bottom;

    this.xScale = d3.scaleTime().domain(this.xDomain).range([0, this.width]);
    this.yScaleA = d3.scaleLinear().domain(this.yDomainA).range([this.height, 0]);
    //this.yScaleB = d3.scaleLinear().domain(this.yDomainB).range([this.height, 0]);

     this.lineA = d3.line<any>()
      .x((d: any) => this.xScale(d.x))
      .y((d: any) => this.yScaleA(d.y));

    
    this.chartParent= d3.select(element).append("svg")
      .attr("width", element.offsetWidth)
      .attr("height", element.offsetHeight)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.xAxis = this.chartParent.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale)
      .tickFormat(d3.timeFormat('%x')));
      
      this.items = [
        {label: 'Zoom Scales', icon: 'fa-plus'},
        {label: 'Zoom Scales', icon: 'fa-plus',separator:true},
        {label: '2 yrs', icon: 'fa-plus',  command: (event) => {
          //debugger;
          this.selectedType=event.item.label;
          this.updateChartMenu(event.item.label);
         
      }},
        {label: '1 yr', icon: 'fa-download', command: (event) => {
         
          this.selectedType=event.item.label;
          this.updateChartMenu(event.item.label);
      }},
        {label: '6 M', icon: 'fa-refresh', command: (event) => {
          
          this.selectedType=event.item.label;
          this.updateChartMenu(event.item.label);
      }},
        {label: '3 M', icon: 'fa-refresh', command: (event) => {
        
          this.selectedType=event.item.label;
          this.updateChartMenu(event.item.label);
      }},
        {label: '1 M', icon: 'fa-refresh', command: (event) => {
         
          this.selectedType=event.item.label;
          this.updateChartMenu(event.item.label);
      }}
    ];
  
  }
  itmClick(event)
  {

  }
  onChangeEvent({target}){
    //debugger;
    this.selectedType = target.value;
    
    this.updateChart(target.value);
}
onClickEvent({target}){
  //debugger;
 // this.updateChartFromButton(target.value,target.textContent);
 this.updateChartFromButtonMenu(this.selectedType,target.textContent);
 
}
updateChartFromButtonMenu(value,type)
{
  if(value == "2 yrs" && type=="Previous")
    {
      let m = moment(this.xDomain[0]).add(-2, 'year').toDate();
      
       this.xDomain = [m, this.xDomain[0]];
      //this.xDomain = [new Date('1/1/' + (this.xDomain[0].getFullYear() - 2).toString()), new Date('12/31/' + (this.xDomain[0].getFullYear() - 2).toString())];
    }
    else if(value == "2 yrs" && type=="Next")
      {
        let m = moment(this.xDomain[1]).add(2, 'year').toDate();
        
         this.xDomain = [this.xDomain[1],m];
        //this.xDomain = [new Date('1/1/' + (this.xDomain[0].getFullYear() - 2).toString()), new Date('12/31/' + (this.xDomain[0].getFullYear() - 2).toString())];
      }
    else  if(value == "1 yr" && type=="Previous")
      {
        let m = moment(this.xDomain[0]).add(-1, 'year').toDate();
        this.xDomain = [m, this.xDomain[0]];
        // this.xDomain = [m, this.xDomain[0]];
        //this.xDomain = [new Date('1/1/' + (this.xDomain[0].getFullYear() - 1).toString()), new Date('12/31/' + (this.xDomain[0].getFullYear() - 2).toString())];
        
      }
      else  if(value == "1 yr" && type=="Next")
        {
          let m = moment(this.xDomain[1]).add(1, 'year').toDate();
          this.xDomain = [this.xDomain[1],m];
           //this.xDomain = [m, this.xDomain[0]];
         // this.xDomain = [new Date('1/1/' + (this.xDomain[0].getFullYear() - 1).toString()), new Date('12/31/' + (this.xDomain[0].getFullYear() - 2).toString())];
          
        }
      else  if(value == "6 M"  && type=="Previous")
        {
          
          let m = moment(this.xDomain[0]).add(-6, 'month').toDate();
          this.xDomain = [m, this.xDomain[0]];
         // this.xDomain = [m, this.xDomain[0]];
          
        }
        else  if(value == "6 M"  && type=="Next")
          {
            
            let m = moment(this.xDomain[1]).add(6, 'month').toDate();
            this.xDomain = [this.xDomain[1],m];
           // this.xDomain = [m, this.xDomain[0]];
            
          }
        else  if(value == "3 M" && type=="Previous")
          {
            
            let m = moment(this.xDomain[0]).add(-3, 'month').toDate();
            //this.xDomain = [new Date('1/'+ (this.xDomain[0].getMonth() - 3).toString() + '/' + (this.xDomain[0].getFullYear()).toString()), this.xDomain[0]];
            this.xDomain = [m, this.xDomain[0]];
          }
          else  if(value == "3 M" && type=="Next")
            {
              
              let m = moment(this.xDomain[1]).add(3, 'month').toDate();
              //this.xDomain = [new Date('1/'+ (this.xDomain[0].getMonth() - 3).toString() + '/' + (this.xDomain[0].getFullYear()).toString()), this.xDomain[0]];
              this.xDomain = [this.xDomain[1],m];
            }
          else  if(value == "1 M" && type=="Previous")
            {
             
              let m = moment(this.xDomain[0]).add(-1, 'month').toDate();
             // this.xDomain = [new Date('1/'+ (this.xDomain[0].getMonth() - 1).toString() + '/' + (this.xDomain[0].getFullYear()).toString()), this.xDomain[0]];
             this.xDomain = [m, this.xDomain[0]];
            }
            else  if(value == "1 M" && type=="Next")
              {
               
                let m = moment(this.xDomain[1]).add(1, 'month').toDate();
                //this.xDomain = [new Date('1/'+ (this.xDomain[0].getMonth() - 1).toString() + '/' + (this.xDomain[0].getFullYear()).toString()), this.xDomain[0]];
                this.xDomain = [this.xDomain[1],m];
              }
            this.xScale.domain(this.xDomain);
            
             this.xAxis.transition().call(d3.axisBottom(this.xScale));
            
             this.childChart.updateChartFromButton(value,type,this.xDomain);
             this.childPie.updateChartFromButton(value,type,this.xDomain);
}
updateChartFromButton(value,type)
{
 debugger;
 //var moment = require('moment');
 value = this.selectedType;
  let chartVal =this.xDomain[0].getFullYear().toString();
 
  
  if(value !="last3" &&  value !="last5" && value !="last10" && value )
    {
      value = chartVal;
    }
   if(value=="2007" && type=="Previous")
    {
      //this.xDomain = [new Date('1/1/2006'), new Date('12/31/2006')];
      alert("range exceeded");
    }
    else if(value=="2007" && type=="Next")
      {
        this.xDomain = [new Date('1/1/2008'), new Date('12/31/2008')];
      }
    else if(value=="2008" && type=="Previous")
      {
        this.xDomain = [new Date('1/1/2007'), new Date('12/31/2007')];
      }
      else if(value=="2008" && type=="Next")
        {
          this.xDomain = [new Date('1/1/2009'), new Date('12/31/2009')];
        }
      else if(value=="2009" && type=="Previous")
        {
          this.xDomain = [new Date('1/1/2008'), new Date('12/31/2008')];
        }
        else if(value=="2009" && type=="Next")
          {
            this.xDomain = [new Date('1/1/2010'), new Date('12/31/2010')];
          }
        else if(value=="2010" && type=="Previous")
            {
              this.xDomain = [new Date('1/1/2009'), new Date('12/31/2009')];
            }
            else if(value=="2010" && type=="Next")
              {
                this.xDomain = [new Date('1/1/2011'), new Date('12/31/2011')];
              }
            else if(value=="2011"  && type=="Previous")
              {
                this.xDomain = [new Date('1/1/2010'), new Date('12/31/2010')];
              }
              else if(value=="2011"  && type=="Next")
                {
                  this.xDomain = [new Date('1/1/2012'), new Date('12/31/2012')];
                }
              else if(value=="2012"  && type=="Previous")
                {
                  this.xDomain = [new Date('1/1/2011'), new Date('12/31/2011')];
                }
                else if(value=="2012"  && type=="Next")
                  {
                    this.xDomain = [new Date('1/1/2013'), new Date('12/31/2013')];
                  }
                else if(value=="2013" && type=="Previous")
                  {
                    this.xDomain = [new Date('1/1/2012'), new Date('12/31/2012')];
                  }
                  else if(value=="2013" && type=="Next")
                    {
                      this.xDomain = [new Date('1/1/2014'), new Date('12/31/2014')];
                    }
                  else if(value=="2014"  && type=="Previous")
                    {
                      this.xDomain = [new Date('1/1/2013'), new Date('12/31/2013')];
                    }
                    else if(value=="2014"  && type=="Next")
                      {
                        this.xDomain = [new Date('1/1/2015'), new Date('12/31/2015')];
                      }
                    else if(value=="2015"  && type=="Previous")
                      {
                        this.xDomain = [new Date('1/1/2014'), new Date('12/31/2014')];
                      }
                      else if(value=="2015"  && type=="Next")
                        {
                          this.xDomain = [new Date('1/1/2016'), new Date('12/31/2016')];
                        }
                      else if(value=="2016" && type=="Previous")
                        {
                          this.xDomain = [new Date('1/1/2015'), new Date('12/31/2015')];
                        }
                        else if(value=="2016" && type=="Next")
                          {
                            this.xDomain = [new Date('1/1/2017'), new Date('12/31/2017')];
                          }
                        else if(value=="2017" && type=="Previous")
                          {
                            this.xDomain = [new Date('1/1/2016'), new Date('12/31/2016')];
                          }
                          else if(value=="2017" && type=="Next")
                            {
                              //this.xDomain = [new Date('1/1/2018'), new Date('12/31/2018')];
                              alert("range exceeded");
                            }
                          else if(value=="last3"  && type=="Previous"  && chartVal =="2015")
                            {
                              this.xDomain = [new Date('1/1/2012'), new Date('12/31/2014')];
                            }
                            else if(value=="last3"  && type=="Previous"  && chartVal =="2012")
                              {
                                this.xDomain = [new Date('1/1/2009'), new Date('12/31/2011')];
                              }
                              else if(value=="last3"  && type=="Previous"  && chartVal =="2009")
                                {
                                  alert("range exceeded");
                                  //this.xDomain = [new Date('1/1/2008'), new Date('12/31/2010')];
                                }
                            else if(value=="last3"  && type=="Next" && chartVal =="2015")
                              {
                                //this.xDomain = [new Date('1/1/2011'), new Date('12/31/2014')];
                                alert("range exceeded");
                              }
                              else if(value=="last3"  && type=="Next" && chartVal =="2012")
                                {
                                  this.xDomain = [new Date('1/1/2015'), new Date('12/31/2017')];
                                  //alert("range exceeded");
                                }
                                else if(value=="last3"  && type=="Next" && chartVal =="2009")
                                  {
                                    this.xDomain = [new Date('1/1/2012'), new Date('12/31/2014')];
                                    //alert("range exceeded");
                                  }
                            else if(value=="last5" && type=="Previous"  && chartVal =="2013")
                              {
                                this.xDomain = [new Date('1/1/2008'), new Date('12/31/2012')];
                              }
                              else if(value=="last5" && type=="Previous"  && chartVal =="2008")
                                {
                                  alert("range exceeded");
                                  //this.xDomain = [new Date('1/1/2008'), new Date('12/31/2012')];
                                }
                              else if(value=="last5"  && type=="Next" && chartVal =="2013")
                                {
                                  //this.xDomain = [new Date('1/1/2011'), new Date('12/31/2014')];
                                  alert("range exceeded");
                                }
                                else if(value=="last5"  && type=="Next" && chartVal =="2008")
                                  {
                                    this.xDomain = [new Date('1/1/2013'), new Date('12/31/2017')];
                                    //alert("range exceeded");
                                  }
                              else if(value=="last10" && (type=="Previous" || type=="Next"))
                                {
                                  alert("range exceeded");
                                  //this.xDomain = [new Date('1/1/2007'), new Date('12/31/2017')];
                                }
                                else {
                                  this.xDomain = [new Date('1/1/2007'), new Date()];
                                  this.selectedType ="";
                                }
                          //debugger;
  
  // update scales & axis
  this.xScale.domain(this.xDomain);
 
  this.xAxis.transition().call(d3.axisBottom(this.xScale));
 
  this.childChart.updateChartFromButton(value,type,this.xDomain);
  this.childPie.updateChartFromButton(value,type,this.xDomain);

  
}
updateChartMenu(value) {
   //debugger;
   if(value=="2 yrs")
     {
       this.xDomain = [new Date('1/1/2016'), new Date('12/31/2017')];
     }
     else if(value=="1 yr")
       {
         this.xDomain = [new Date('1/1/2017'), new Date('12/31/2017')];
       }
       else if(value=="6 M")
         {
           this.xDomain = [new Date('7/1/2017'), new Date('12/31/2017')];
         }
         else if(value=="3 M")
             {
               this.xDomain = [new Date('10/1/2017'), new Date('12/31/2017')];
             }
             else if(value=="1 M")
               {
                 this.xDomain = [new Date('12/1/2017'), new Date('12/31/2017')];
               }
               
              else{
                this.xDomain = [new Date('1/1/2007'), new Date()];
              }
                           //debugger;
   
   // update scales & axis
   this.xScale.domain(this.xDomain);
  
   this.xAxis.transition().call(d3.axisBottom(this.xScale));
  
   this.childChart.updateChart(value,this.xDomain);
   this.childPie.updateChart(value,this.xDomain);
  }
   
 
updateChart(value) {
 // debugger;
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
                                this.xDomain = [new Date('1/1/2013'), new Date('12/31/2017')];
                              }
                              else if(value=="last10")
                                {
                                  this.xDomain = [new Date('1/1/2008'), new Date('12/31/2017')];
                                }
                                else{
                                  this.xDomain = [new Date('1/1/2007'), new Date()];
                                }
                          //debugger;
  
  // update scales & axis
  this.xScale.domain(this.xDomain);
 
  this.xAxis.transition().call(d3.axisBottom(this.xScale));
 
  this.childChart.updateChart(value,this.xDomain);
  this.childPie.updateChart(value,this.xDomain);
 }
  
}
