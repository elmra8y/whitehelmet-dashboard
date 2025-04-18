import {Component, inject} from '@angular/core';
import {AttractionsStoreService} from '../attractions.store.service';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {AttractionsFormDialogComponent} from '../attractions-form-dialog/attractions-form-dialog.component';

@Component({
  selector: 'app-attractions-list',
  templateUrl: './attractions-list.component.html',
  styleUrl: './attractions-list.component.scss',
  standalone: false
})
export class AttractionsListComponent {

  #matDialog = inject(MatDialog);
  #store = inject(AttractionsStoreService);

  protected readonly Math = Math;
  attractions$ = this.#store.attractions;
  total$ = this.#store.total;
  loading$ = this.#store.loading;
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((term) => this.setSearch(term));
  }

  get currentPage() {
    return this.#store.currentPage;
  }

  get currentSort() {
    return this.#store.currentSort;
  }

  get pageSize() {
    return this.#store.pageSizeValue;
  }

  setSearch(term: any) {
    this.#store.setSearch(term);
  }

  setPage(page: number) {
    this.#store.setPage(page);
  }

  setSort(field: string) {
    this.#store.setSort(field);
  }

  openAttractionDialog(attraction: any = null): void {
    const dialogRef = this.#matDialog.open(AttractionsFormDialogComponent, {
      panelClass: 'side-drawer',
      width: '400px',
      data: attraction,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.#store.refresh();
        Swal.fire({
          icon: 'success',
          title: attraction ? 'Attraction updated' : 'Attraction created',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  openDeleteAttractionDialog(attraction: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${attraction.fname} ${attraction.lname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#store.deleteAttraction(attraction.id).subscribe({
          next: () => {
            this.#store.refresh();
            Swal.fire({
              icon: 'success',
              title: 'Attraction deleted',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete attraction',
              text: err?.error?.message || 'Something went wrong',
            });
          },
        });
      }
    });
  }

}
