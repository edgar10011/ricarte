import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiegoPage } from './riego.page';

describe('RiegoPage', () => {
  let component: RiegoPage;
  let fixture: ComponentFixture<RiegoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RiegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
