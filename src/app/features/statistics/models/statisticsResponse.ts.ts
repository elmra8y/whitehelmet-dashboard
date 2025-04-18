export interface SeriesItem {
  name: string;
  data: number[];
}

export interface WeeklyDataResponse {
  series: SeriesItem[];
  categories: string[];
}

export interface DailyDataResponse {
  date: string;
  animal: string;
  price: string;  // Assuming price is a string, but it could be a number if you want to handle it as such
}
