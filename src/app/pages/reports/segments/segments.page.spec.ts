import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegmentsPage } from './segments.page';

describe('SegmentsPage', () => {
  let component: SegmentsPage;
  let fixture: ComponentFixture<SegmentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
