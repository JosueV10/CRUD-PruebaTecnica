import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizasComponent } from './polizas.component';

describe('Polizas', () => {
  let component: PolizasComponent;
  let fixture: ComponentFixture<PolizasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolizasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolizasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
