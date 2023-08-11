import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiModalPage } from './mi-modal.page';

describe('MiModalPage', () => {
  let component: MiModalPage;
  let fixture: ComponentFixture<MiModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MiModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
