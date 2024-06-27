import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDeleteUsersPage } from './admin-delete-users.page';

describe('AdminDeleteUsersPage', () => {
  let component: AdminDeleteUsersPage;
  let fixture: ComponentFixture<AdminDeleteUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeleteUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
