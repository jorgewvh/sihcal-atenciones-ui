import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAtencionesPageComponent } from './registro-atenciones-page.component';

describe('RegistroAtencionesPageComponent', () => {
  let component: RegistroAtencionesPageComponent;
  let fixture: ComponentFixture<RegistroAtencionesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAtencionesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAtencionesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
