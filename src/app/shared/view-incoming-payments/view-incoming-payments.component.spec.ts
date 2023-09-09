import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIncomingPaymentsComponent } from './view-incoming-payments.component';

describe('ViewIncomingPaymentsComponent', () => {
  let component: ViewIncomingPaymentsComponent;
  let fixture: ComponentFixture<ViewIncomingPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewIncomingPaymentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewIncomingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
