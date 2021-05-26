import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPreviewComponent } from './customer-preview.component';

describe('CustomerPreviewComponent', () => {
  let component: CustomerPreviewComponent;
  let fixture: ComponentFixture<CustomerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
