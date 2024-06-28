import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuscriptionPage } from './suscription.page';

describe('SuscriptionPage', () => {
  let component: SuscriptionPage;
  let fixture: ComponentFixture<SuscriptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
