import {Component, inject, Inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {AttractionsStoreService} from '../attractions.store.service';

@Component({
  selector: 'app-attractions-form-dialog',
  templateUrl: './attractions-form-dialog.component.html',
  styleUrl: './attractions-form-dialog.component.scss',
  standalone:false
})
export class AttractionsFormDialogComponent {
  #store = inject(AttractionsStoreService);

  attractionForm: FormGroup;
  isEditMode = false;
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AttractionsFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data;

    this.attractionForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      detail: [data?.detail || '', Validators.required],
      coverimage: [data?.coverimage || '', Validators.required],
      coordinates: [
        data ? `${data.latitude}, ${data.longitude}` : '',
        [Validators.required, Validators.pattern(/^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/)]
      ],
    });
  }

  submit(): void {
    if (this.attractionForm.invalid) return;

    this.isLoading.set(true);

    const [latitude, longitude] = this.attractionForm.value.coordinates
      .split(',')
      .map((v: string) => parseFloat(v.trim()));

    const formData = {
      name: this.attractionForm.value.name,
      detail: this.attractionForm.value.detail,
      coverimage: this.attractionForm.value.coverimage,
      latitude,
      longitude,
      ...(this.isEditMode ? { id: this.data.id } : {}),
    };

    const action$ = this.isEditMode
      ? this.#store.updateAttraction(formData)
      : this.#store.createAttraction(formData);

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
