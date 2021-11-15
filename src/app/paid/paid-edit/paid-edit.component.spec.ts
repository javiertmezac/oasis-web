import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidEditComponent } from './paid-edit.component';

describe('PaidEditComponent', () => {
  let component: PaidEditComponent;
  let fixture: ComponentFixture<PaidEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
