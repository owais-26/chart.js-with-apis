import { Chart, registerables, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexTooltip,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexStroke,
  ApexLegend,
} from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';

export type ChartOpt = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
};
export type ChartPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type ChartArea = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
};
Chart.register(...registerables);
Chart.register(ChartDataLabels);
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.css'],
})
export class MychartComponent implements OnInit {
  @ViewChild('chart') chart: any;
  public barChartData: any;

  constructor(private http: HttpClient) {
    this.barChartData = {
      labels: [],
      datasets: [
        {
          label: 'Price',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };
  }

  ngOnInit(): void {
    // Fetch data and update chart data in ngOnInit
    this.createHorizontalBarChart();
    this.createPieChartFromStock();
    this.createScatterPlot();
  }

  createHorizontalBarChart() {
    const feedbackChartCanvas = document.getElementById(
      'feedbackChart'
    ) as HTMLCanvasElement;

    // Fetch product data from an API (replace with your API URL)
    this.http.get('https://dummyjson.com/products').subscribe((data: any) => {
      // Extract data from the API response
      const products = data.products;

      // Sort products by price in descending order (higher price first)
      products.sort((a: any, b: any) => b.price - a.price);

      // Select the top 5 products with the highest price
      const top5Products = products.slice(0, 5);

      // Extract product titles and prices for the top 5 products
      const productTitles = top5Products.map((product: any) => product.title);
      const productPrices = top5Products.map((product: any) => product.price);

      const chartData = {
        labels: productTitles,
        datasets: [
          {
            label: 'Product Prices in USD',
            data: productPrices,
            backgroundColor: '#36A2EB', // Adjust the color as needed
          },
        ],
      };

      new Chart(feedbackChartCanvas, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: 'white',
              },
            },
            y: {
              ticks: {
                color: 'white',
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'white',
              },
            },
            tooltip: {
              enabled: true,
            },
            datalabels: {
              color: 'white',
            },
          },
        } as ChartOptions,
      });
    });
  }
  createPieChartFromStock() {
    const pieChartCanvas = document.getElementById(
      'pieChart'
    ) as HTMLCanvasElement;

    // Fetch product data from an API (replace with your API URL)
    this.http.get('https://dummyjson.com/products').subscribe((data: any) => {
      // Extract data from the API response
      const products = data.products;
      const top5Products = products.slice(0, 5);

      // Extract product titles and prices for the top 5 products
      const productTitles = top5Products.map((product: any) => product.title);

      // Extract stock data from products
      products.sort((a: any, b: any) => b.stock - a.stock);

      // Flatten the stock data (assuming each product has an array of stock values)
      const productStock = top5Products.map((product: any) => product.stock);

      new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
          labels: productTitles, // Set top 5 stock names as labels
          datasets: [
            {
              data: productStock,
              backgroundColor: [
                '#36A2EB',
                '#FF6384',
                '#FFCE56',
                '#C517B8',
                'red',
              ], // Customize colors as needed
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,

          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
              display: true, // Display the legend
            },
            datalabels: {
              formatter: function (value: any, context: any) {
                const dataPoints = context.chart.data.datasets[0].data;
                function totalSum(total: any, dataPoint: any) {
                  return total + dataPoint;
                }

                const totalValue = dataPoints.reduce(totalSum, 0);
                const percent = ((value / totalValue) * 100).toFixed(1);
                return percent + '%';
              },
              color: 'white',
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    });
  }
  createScatterPlot() {
    const scatterPlotCanvas = document.getElementById(
      'scatterPlot'
    ) as HTMLCanvasElement;

    // Fetch product data from an API (replace with your API URL)
    this.http.get('https://dummyjson.com/products').subscribe((data: any) => {
      // Extract data from the API response
      const products = data.products;

      // Sort products by price in descending order (higher price first)
      products.sort((a: any, b: any) => b.price - a.price);

      // Select the top 10 products with the highest price
      const top10Products = products.slice(0, 10);

      // Extract price and rating data for the top 10 products
      const prices = top10Products.map((product: any) => product.price);
      const ratings = top10Products.map((product: any) => product.rating);

      // Create a scatter plot
      new Chart(scatterPlotCanvas, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Price vs. Rating',
              data: prices.map((price: any, index: any) => ({
                x: price,
                y: ratings[index],
              })),
              backgroundColor: 'white',
              pointRadius: 7, // Increase the point size by setting a larger value
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Price',
                color: 'white',
              },
              ticks: {
                color: 'white',
              },
            },
            y: {
              type: 'linear',
              position: 'left',
              title: {
                display: true,
                text: 'Rating',
                color: 'white',
              },
              ticks: {
                color: 'white',
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
          },
        },
      });
    });
  }
}
