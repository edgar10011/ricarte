import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnciclopediaPage } from './enciclopedia.page';

describe('EnciclopediaPage', () => {
  let component: EnciclopediaPage;
  let fixture: ComponentFixture<EnciclopediaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnciclopediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
