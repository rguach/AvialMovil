import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Seg1Page } from './seg1.page';

describe('Seg1Page', () => {
  let component: Seg1Page;
  let fixture: ComponentFixture<Seg1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Seg1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
