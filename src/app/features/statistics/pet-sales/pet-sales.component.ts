import {Component, inject, NgZone} from '@angular/core';
import {StatisticsStoreService} from '../statistics.store.service';
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from 'ng2-charts';
import {ActiveElement, Chart, ChartConfiguration, ChartEvent} from 'chart.js';
import {DailyDataResponse, SeriesItem, WeeklyDataResponse} from '../models/statisticsResponse.ts';
import {DatePipe} from '@angular/common';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-pet-sales',
  templateUrl: './pet-sales.component.html',
  styleUrl: './pet-sales.component.scss',
  standalone: false
})
export class PetSalesComponent {
  #statisticsStoreService = inject(StatisticsStoreService)
  #zone = inject(NgZone)
  #datePipe = inject(DatePipe)

  selectedDate: any = '2023-01-01';
  selectedDailyDate: any = '';
  dailySalesData: DailyDataResponse[] = [];

  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: true
      },
    },
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    onClick: (
      event: ChartEvent,
      elements: ActiveElement[],
      chart: Chart<'line'>
    ) => {
      if (elements[0]) {
        let date = this.lineChartData.labels![elements[0].index];
        if (date) {
          this.onChartClick(date.toString());
        }
      }
    }
  };

  dailySalesDataLoading: boolean = false;

  ngOnInit(): void {
    this.fetchWeeklyData();
  }

  fetchWeeklyData(): void {
    this.#statisticsStoreService.fetchWeeklyData(this.selectedDate).subscribe({
      next: (res: WeeklyDataResponse) => {
        this.lineChartData = {
          labels: res.categories,
          datasets: res.series.map((item: SeriesItem) => ({
            label: item.name,
            data: item.data,
            fill: false,
            borderColor: this.getColorForLabel(item.name),
            backgroundColor: this.getColorForLabel(item.name),
            tension: 0.4,
            pointRadius: 4
          }))
        };
      },
      error: (err) => {
        console.error('api failed', err);
      }
    });
  }

  getColorForLabel(label: string): string {
    const colorMap: { [key: string]: string } = {
      dog: '#42A5F5',
      cat: '#FF6384'
    };
    return colorMap[label] || '#9CCC65';
  }

  onChartClick(date: string): void {
    this.#zone.run(() => {
      this.selectedDailyDate = date;
      this.dailySalesData = [];
      this.dailySalesDataLoading = true;
    });
    this.fetchDailyData(date);
  }

  fetchDailyData(date: string): void {
    this.#statisticsStoreService.fetchDailyData(date).subscribe({
      next: (res: DailyDataResponse[]) => {
        this.dailySalesData = res;
        this.#zone.run(() => {
          this.dailySalesDataLoading = false;
        });
      },
      error: (err) => {
        console.error('api failed', err);
      }
    });
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.selectedDate = this.#datePipe.transform(event.value, 'yyyy-MM-dd');
    this.fetchWeeklyData();
  }
}
