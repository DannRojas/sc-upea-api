import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminComponent } from './modal-admin.component';

describe('ModalAdminComponent', () => {
  let component: ModalAdminComponent;
  let fixture: ComponentFixture<ModalAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
