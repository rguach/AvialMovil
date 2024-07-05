import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Seg6Page } from './seg6.page';

describe('Seg6Page', () => {
  let component: Seg6Page;
  let fixture: ComponentFixture<Seg6Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Seg6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
