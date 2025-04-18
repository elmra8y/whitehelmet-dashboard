import {Component, inject, Inject, signal} from '@angular/core';
import {FormBuilder, FormGroup,  Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersStoreService} from '../users.store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss',
  standalone:false
})
export class UserFormDialogComponent {
  #store = inject(UsersStoreService);

  userForm: FormGroup;
  isEditMode = false;

  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;
    this.userForm = this.fb.group({
      fname: [data?.fname || '', Validators.required],
      lname: [data?.lname || '', Validators.required],
      username: [data?.username || '', Validators.required],
      avatar: [data?.avatar || '', Validators.required]
    });
  }

  submit(): void {
    if (this.userForm.invalid) return;

    this.isLoading.set(true);

    const formData = {
      ...this.userForm.value,
      email: this.userForm.value.username,
      ...(this.isEditMode ? {id: this.data.id} : {})
    };

    const action$ = this.isEditMode
      ? this.#store.updateUser(formData)
      : this.#store.createUser(formData);

    action$.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.isLoading.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err?.error?.message || 'Something went wrong',
        });
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
