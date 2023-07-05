import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApInvoiceComponent } from './view-ap-invoice.component';

describe('ViewApInvoiceComponent', () => {
  let component: ViewApInvoiceComponent;
  let fixture: ComponentFixture<ViewApInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
