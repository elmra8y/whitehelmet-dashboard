import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Attraction} from './models/attractionsResponse.ts';

@Injectable({providedIn: 'root'})
export class AttractionsStoreService {
  private attractions$ = new BehaviorSubject<Attraction[]>([]);
  private total$ = new BehaviorSubject<number>(0);
  private loading$ = new BehaviorSubject<boolean>(false);

  private searchTerm$ = new BehaviorSubject<string>('');
  private currentPage$ = new BehaviorSubject<number>(1);
  private sortField$ = new BehaviorSubject<string>('name');
  private sortDirection$ = new BehaviorSubject<'asc' | 'desc'>('asc');
  private readonly pageSize = 10;

  constructor(private http: HttpClient) {
    combineLatest([
      this.searchTerm$,
      this.currentPage$,
      this.sortField$,
      this.sortDirection$,
    ])
      .pipe(
        distinctUntilChanged(),
        tap(() => this.loading$.next(true)),
        switchMap(([search, page, sort_column, sort_order]) =>
          this.fetchAttractions({search, page, per_page: this.pageSize, sort_column, sort_order})
        )
      )
      .subscribe({
        next: (res) => {
          this.attractions$.next(res.data);
          this.total$.next(res.total);
          this.loading$.next(false);
        },
        error: (err) => {
          console.error('Attraction fetch failed', err);
          this.loading$.next(false);
        },
      });
  }

  private fetchAttractions(query: {
    search: string;
    page: number;
    per_page: number;
    sort_column: string;
    sort_order: string;
  }) {
    let params = new HttpParams()
      .set('search', query.search)
      .set('page', query.page)
      .set('per_page', query.per_page)
      .set('sort_column', query.sort_column)
      .set('sort_order', query.sort_order);

    return this.http.get<{ data: Attraction[]; total: number }>('api/attractions', {params});
  }

  refresh() {
    // Emit current values to re-trigger combineLatest
    this.searchTerm$.next(this.searchTerm$.value);
  }

  // Public Observables
  get attractions() {
    return this.attractions$.asObservable();
  }

  get total() {
    return this.total$.asObservable();
  }

  get loading() {
    return this.loading$.asObservable();
  }

  // State Modifiers
  setSearch(term: string) {
    this.searchTerm$.next(term);
    this.currentPage$.next(1);
  }

  setPage(page: number) {
    this.currentPage$.next(page);
  }

  setSort(field: string) {
    if (this.sortField$.value === field) {
      const newDirection = this.sortDirection$.value === 'asc' ? 'desc' : 'asc';
      this.sortDirection$.next(newDirection);
    } else {
      this.sortField$.next(field);
      this.sortDirection$.next('asc');
    }
  }

  get currentSort() {
    return {
      field: this.sortField$.value,
      direction: this.sortDirection$.value,
    };
  }

  get currentPage() {
    return this.currentPage$.value;
  }

  get pageSizeValue() {
    return this.pageSize;
  }

  // CRUD APIs

  getAttractionDetail(id: number) {
    return this.http.get<Attraction>(`api/auth/attractions/${id}`);
  }

  createAttraction(payload: Partial<Attraction>) {
    return this.http.post<Attraction>('api/auth/attractions/create', payload);
  }

  updateAttraction(payload: Partial<Attraction>) {
    return this.http.put<Attraction>('api/auth/attractions/update', payload);
  }

  deleteAttraction(id: number) {
    return this.http.delete<{ message: string }>('api/auth/attractions/delete', {
      body: {id},
    });
  }
}
