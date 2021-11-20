import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextblockDeleteComponent } from './nextblock-delete.component';

describe('NextblockDeleteComponent', () => {
  let component: NextblockDeleteComponent;
  let fixture: ComponentFixture<NextblockDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextblockDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextblockDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
