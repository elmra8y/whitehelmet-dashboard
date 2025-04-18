import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {DailyDataResponse, WeeklyDataResponse} from './models/statisticsResponse.ts';

@Injectable({
  providedIn: 'root'
})
export class StatisticsStoreService {
  #http = inject(HttpClient)

  fetchWeeklyData(date: string) {
    return this.#http.get<WeeklyDataResponse>(`https://www.melivecode.com/api/pets/7days/${date}`).pipe(
      tap(res => {
      })
    );
  }

  fetchDailyData(date: string) {
    return this.#http.get<DailyDataResponse[]>(`https://www.melivecode.com/api/pets/${date}`).pipe(
      tap(res => {
      })
    );
  }


}
