import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadOrderComponent } from './load-order.component';

describe('LoadOrderComponent', () => {
  let component: LoadOrderComponent;
  let fixture: ComponentFixture<LoadOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
