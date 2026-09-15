import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSesion } from './crear-sesion';

describe('CrearSesion', () => {
  let component: CrearSesion;
  let fixture: ComponentFixture<CrearSesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearSesion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearSesion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
