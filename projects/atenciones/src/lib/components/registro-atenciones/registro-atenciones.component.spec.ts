import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAtencionesComponent } from './registro-atenciones.component';

describe('RegistroAtencionesComponent', () => {
  let component: RegistroAtencionesComponent;
  let fixture: ComponentFixture<RegistroAtencionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAtencionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
