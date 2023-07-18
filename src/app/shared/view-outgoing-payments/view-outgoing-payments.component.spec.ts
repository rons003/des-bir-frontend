import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOutgoingPaymentsComponent } from './view-outgoing-payments.component';

describe('ViewOutgoingPaymentsComponent', () => {
  let component: ViewOutgoingPaymentsComponent;
  let fixture: ComponentFixture<ViewOutgoingPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOutgoingPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOutgoingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
