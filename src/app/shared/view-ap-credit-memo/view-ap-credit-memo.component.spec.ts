import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApCreditMemoComponent } from './view-ap-credit-memo.component';

describe('ViewApCreditMemoComponent', () => {
  let component: ViewApCreditMemoComponent;
  let fixture: ComponentFixture<ViewApCreditMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApCreditMemoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApCreditMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
