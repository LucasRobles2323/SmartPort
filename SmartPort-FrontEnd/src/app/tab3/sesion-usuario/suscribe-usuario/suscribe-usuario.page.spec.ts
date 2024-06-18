import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuscribeUsuarioPage } from './suscribe-usuario.page';

describe('SuscribeUsuarioPage', () => {
  let component: SuscribeUsuarioPage;
  let fixture: ComponentFixture<SuscribeUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuscribeUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
