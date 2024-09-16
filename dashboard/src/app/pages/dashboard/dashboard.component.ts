import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import axios from 'axios';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  year:number
  templatecolor = 'bg-gradient-info';

  ngOnInit() {
    parseOptions(Chart, chartOptions());

    this.year = new Date().getFullYear()
    this.get()

    if (!localStorage.getItem('templatecolor')) localStorage.setItem('templatecolor','bg-gradient-info');
    this.templatecolor = localStorage.getItem('templatecolor');
  }

  async get(){
    const response = await axios.get('http://localhost:5000/event/chart?year='+this.year)
    const blueProfits:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    const orangeProfits:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    const greenProfits:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    const grayProfits:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    const blueCounts:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    const orangeCounts:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    const greenCounts:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
    const grayCounts:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]

    let sumBlue:number=0; let sumGreen:number=0; let sumOrange:number=0; let sumGray:number=0;
    if(response.data){
      response.data.forEach(item => {
        if(item.domain=="blue") {blueProfits[item.month-1]=item.sumprofit; sumBlue+=item.sumprofit; blueCounts[item.month-1]=item.count;}
        if(item.domain=="orange") {orangeProfits[item.month-1]=item.sumprofit; sumOrange+=item.sumprofit; orangeCounts[item.month-1]=item.count;}
        if(item.domain=="green") {greenProfits[item.month-1]=item.sumprofit; sumGreen+=item.sumprofit; greenCounts[item.month-1]=item.count;}
        if(item.domain=="gray") {grayProfits[item.month-1]=item.sumprofit; sumGray+=item.sumprofit; grayCounts[item.month-1]=item.count;}
      });
    }
    document.getElementById('bluecardvalue').textContent = sumBlue+' DH'
    document.getElementById('greencardvalue').textContent = sumGreen+' DH'
    document.getElementById('orangecardvalue').textContent = sumOrange+' DH'
    document.getElementById('graycardvalue').textContent = sumGray+' DH'
    document.getElementById('profitsum').textContent = (sumBlue+sumGreen+sumOrange+sumGray)+' DH'

    var chartSales = document.getElementById('chart-sales');


    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: {
        events: null,
        legend:{
          display:true,
          position:'bottom',
          labels:{}
        },
        scales: {
          x: {
            grid: {
              display: true, // Show grid lines on the x-axis
            }
          },
          yAxes: [{
            gridLines: {
              color: 'gray',
              zeroLineColor:'gray',
              drawOnChartArea: true
            },
            ticks: {
              callback: function(value) {
                if (!(value % 10)) {
                  return value + ' DH';
                }
              }
            }
          }]
        }
      },
			data: {
        labels: ["1-jan", "2-fév", "3-mar", "4-avr", "5-mai", "6-jui", "7-jui", "8-aoû", "9-sep", "10-oct", "11-nov", "12-déc"],
        datasets: [
          {
            label: 'NETTOYAGE',
            data: blueProfits,
            borderColor:'blue', backgroundColor:'transparent'
          },
          {
            label: 'LIVRAISON',
            data: orangeProfits,
            borderColor:'orange', backgroundColor:'transparent'
          },
          {
            label: 'RESTAURATION',
            data: greenProfits,
            borderColor:'green', backgroundColor:'transparent'
          },
          {
            label: 'AUTRES',
            data: grayProfits,
            borderColor:'gray', backgroundColor:'transparent'
          }
        ]
      }
		});
    
    chartExample2.data.datasets[0].data = blueCounts
    chartExample2.data.datasets[1].data = orangeCounts
    chartExample2.data.datasets[2].data = greenCounts
    chartExample2.data.datasets[3].data = grayCounts

    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());
    
    const ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: {
        events: null,
        scales: {

          yAxes: [
            {
              ticks: {
                callback: function(value) {
                  if ((value-Math.floor(value))===0) {
                    return value;
                  }
                }
              }
            }
          ]
        }
      },
      data: {
        labels: ["1-jan", "2-fév", "3-mar", "4-avr", "5-mai", "6-jui", "7-jui", "8-aoû", "9-sep", "10-oct", "11-nov", "12-déc"],
        datasets:[
          {
            label: "NETTOYAGE ",
            backgroundColor: 'blue',
            data: blueCounts,
            maxBarThickness: 10
          },
          {
            label: "LIVRAISON ",
            backgroundColor: 'orange',
            data: orangeCounts,
            maxBarThickness: 10
          },
          {
            label: "RESTAURATION ",
            backgroundColor: 'green',
            data: greenCounts,
            maxBarThickness: 10
          },
          {
            label: "AUTRES ",
            backgroundColor: 'gray',
            data: grayCounts,
            maxBarThickness: 10
          },
        ]
      } 
    });

  }

}
