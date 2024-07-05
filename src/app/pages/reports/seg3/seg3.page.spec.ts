import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Seg3Page } from './seg3.page';

describe('Seg3Page', () => {
  let component: Seg3Page;
  let fixture: ComponentFixture<Seg3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Seg3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
