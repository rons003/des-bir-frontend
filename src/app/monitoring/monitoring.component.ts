import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal, NgbTimeAdapter, NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../core/api.client.generated';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { ViewApInvoiceComponent } from '../shared/view-ap-invoice/view-ap-invoice.component';
import { ViewApCreditMemoComponent } from '../shared/view-ap-credit-memo/view-ap-credit-memo.component';
import { ViewApDownpaymentComponent } from '../view-ap-downpayment/view-ap-downpayment.component';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  page = 1;
  pageSize = 10;

  birTransactions: any[] = [];
  birTransactionsUploaded: any[] = [];

  dpFrom: NgbDateStruct | undefined;
  dpTo: NgbDateStruct | undefined;
  transactionType: number = 204;
  transactionTypeName: string | undefined;
  filterType: number = 204;
  filterSearch: string = '';
  transactionTypes = [
    { value: 204, label: 'A/P Down Payment Invoice' },
    { value: 18, label: 'A/P Invoice' },
    { value: 19, label: 'A/P Credit Memo' },
    // { value: 24, label: 'Incoming Payments' },
    // { value: 30, label: 'Journal Entry' },
    // { value: 46, label: 'Outgoing Payments' },
  ];
  checkAll: boolean = true;

  constructor(private modalService: NgbModal,
    private apiService: Service) { }

  ngOnInit(): void {
    this.getBIRTransactionsUploaded();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getBIRTransactions() {
    this.apiService.bIRTransactions(this.transactionType)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(res => {
        this.birTransactions = res;
      });
  }

  getBIRTransactionsUploaded() {
    this.apiService.bIRTransactionsUploaded(this.filterType, this.filterSearch)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(res => {
        this.birTransactionsUploaded = res;
      });
  }

  Upload() {
    let transactions: number[] = [];
    const birTransactions = this.birTransactions.filter(key => key.selected == true);
    birTransactions.forEach((o: any) => {
      transactions.push(o.docNum)
    });

    if (this.transactionType == 204) {
      this.apiService.addAPDPI(transactions)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            Swal.fire('Transaction Uploaded!', res.message, 'success');
          },
          error => {
            Swal.close();
          }
        );
    }
    if (this.transactionType == 18) {
      this.apiService.addAPInvoice(transactions)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            Swal.fire('Transaction Uploaded!', res.message, 'success');
          },
          error => {
            Swal.close();
          }
        );
    }

    if (this.transactionType == 19) {
      this.apiService.addAPCM(transactions)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            Swal.fire('Transaction Uploaded!', res.message, 'success');
          },
          error => {
            Swal.close();
          }
        );
    }
  }

  Search() {
    this.getBIRTransactionsUploaded();
  }

  onEmptySearch() {
    if (this.filterSearch === '')
      this.getBIRTransactionsUploaded();
  }

  onChangeFilterType() {
    this.getBIRTransactionsUploaded();
  }

  onChangeTransactionType() {
    this.getBIRTransactions();
    this.transactionTypeName = this.transactionTypes.find(o => o.value == this.transactionType)?.label;
  }

  onCheckAll() {
    for (let i = 0; i < this.birTransactions.length; i++) {
      this.birTransactions[i].selected = this.checkAll;
    }
  }

  onCheck() {
    if (this.birTransactions.find(e => e.selected === true))
      this.checkAll = true;
    else
      this.checkAll = false;
  }

  openXl(content: any) {
    this.birTransactions = [];
    this.transactionType = 204;
    this.checkAll = true;
    this.getBIRTransactions();
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

  confirmationUpload() {
    Swal.fire({
      title: 'Do you want to process the batch uploading?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.showLoading();
        this.Upload();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  showLoading() {
    Swal.fire({
      title: 'Loading',
      text: 'Please wait...',
      // tslint:disable-next-line: max-line-length
      imageUrl: 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==',
      showConfirmButton: false,
      allowOutsideClick: false
    });
  }

  openViewApDownPaymentModal(ap: number){
    const modalRef = this.modalService.open(ViewApDownpaymentComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }
  openViewApInvoiceModal(ap: number){
    const modalRef = this.modalService.open(ViewApInvoiceComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }
  openViewApCreditMemoModal(ap: number){
    const modalRef = this.modalService.open(ViewApCreditMemoComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }

}
