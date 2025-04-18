import {Component, inject} from '@angular/core';
import {UsersStoreService} from '../users.store.service';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {UserFormDialogComponent} from '../user-form-dialog/user-form-dialog.component';
import Swal from 'sweetalert2';
import {debounceTime, distinctUntilChanged} from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: false
})
export class UsersListComponent {

  #matDialog = inject(MatDialog);
  #store = inject(UsersStoreService);

  protected readonly Math = Math;
  users$ = this.#store.users;
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

  openUserDialog(user: any = null): void {
    const dialogRef = this.#matDialog.open(UserFormDialogComponent, {
      panelClass: 'side-drawer',
      width: '400px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.#store.refresh();
        Swal.fire({
          icon: 'success',
          title: user ? 'User updated' : 'User created',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }

  openDeleteUserDialog(user: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete ${user.fname} ${user.lname}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.#store.deleteUser(user.id).subscribe({
          next: () => {
            this.#store.refresh();
            Swal.fire({
              icon: 'success',
              title: 'User deleted',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed to delete user',
              text: err?.error?.message || 'Something went wrong',
            });
          },
        });
      }
    });
  }

}
