import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Seg2Page } from './seg2.page';

describe('Seg2Page', () => {
  let component: Seg2Page;
  let fixture: ComponentFixture<Seg2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Seg2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
