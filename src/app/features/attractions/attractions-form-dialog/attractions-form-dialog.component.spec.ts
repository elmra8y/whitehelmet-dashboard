import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsFormDialogComponent } from './attractions-form-dialog.component';

describe('AttractionFormDialogComponent', () => {
  let component: AttractionsFormDialogComponent;
  let fixture: ComponentFixture<AttractionsFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
