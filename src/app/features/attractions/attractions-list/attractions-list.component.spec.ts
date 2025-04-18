import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionsListComponent } from './attractions-list.component';

describe('UsersListComponent', () => {
  let component: AttractionsListComponent;
  let fixture: ComponentFixture<AttractionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttractionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
