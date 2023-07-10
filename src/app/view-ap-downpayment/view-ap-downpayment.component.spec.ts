import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApDownpaymentComponent } from './view-ap-downpayment.component';

describe('ViewApDownpaymentComponent', () => {
  let component: ViewApDownpaymentComponent;
  let fixture: ComponentFixture<ViewApDownpaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApDownpaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApDownpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
