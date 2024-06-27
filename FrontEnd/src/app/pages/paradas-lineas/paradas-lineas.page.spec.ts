import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParadasLineasPage } from './paradas-lineas.page';

describe('ParadasLineasPage', () => {
  let component: ParadasLineasPage;
  let fixture: ComponentFixture<ParadasLineasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ParadasLineasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
