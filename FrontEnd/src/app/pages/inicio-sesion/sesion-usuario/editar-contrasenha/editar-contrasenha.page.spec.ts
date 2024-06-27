import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarContrasenhaPage } from './editar-contrasenha.page';

describe('EditarContrasenhaPage', () => {
  let component: EditarContrasenhaPage;
  let fixture: ComponentFixture<EditarContrasenhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarContrasenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
