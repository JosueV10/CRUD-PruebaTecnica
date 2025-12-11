import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventariosComponent } from './inventarios.component';

describe('Inventarios', () => {
  let component: InventariosComponent;
  let fixture: ComponentFixture<InventariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventariosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
