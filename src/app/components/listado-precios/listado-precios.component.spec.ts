import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPreciosComponent } from './listado-precios.component';

describe('ListadoPreciosComponent', () => {
  let component: ListadoPreciosComponent;
  let fixture: ComponentFixture<ListadoPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPreciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
