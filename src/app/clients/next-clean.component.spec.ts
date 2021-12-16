import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextCleanComponent } from './next-clean.component';

describe('NextCleanComponent', () => {
  let component: NextCleanComponent;
  let fixture: ComponentFixture<NextCleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextCleanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextCleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
