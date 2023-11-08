import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal, NgbTimeAdapter, NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { BIRData, BIRTransaction, Service } from '../core/api.client.generated';
import { AuthService } from '../shared/auth.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ViewApInvoiceComponent } from '../shared/view-ap-invoice/view-ap-invoice.component';
import { ViewApCreditMemoComponent } from '../shared/view-ap-credit-memo/view-ap-credit-memo.component';
import { ViewApDownpaymentComponent } from '../view-ap-downpayment/view-ap-downpayment.component';
import { ViewOutgoingPaymentsComponent } from '../shared/view-outgoing-payments/view-outgoing-payments.component';
import { ViewJournalEntryComponent } from '../shared/view-journal-entry/view-journal-entry.component';
import { ViewIncomingPaymentsComponent } from '../shared/view-incoming-payments/view-incoming-payments.component';
import { DatePipe, formatDate } from '@angular/common';

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
  birValidation: any[] = [];

  trans_date: Date | undefined;

  dpFrom: NgbDateStruct | undefined;
  dpTo: NgbDateStruct | undefined;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  transactionType: number = 204;
  transactionTypeName: string | undefined;
  filterType: number = 204;
  filterSearch: string = '';
  canupdate: boolean = false;
  transactionTypes = [
    { value: 204, label: 'A/P Down Payment Invoice' },
    { value: 18, label: 'A/P Invoice' },
    { value: 19, label: 'A/P Credit Memo' },
    { value: 24, label: 'Incoming Payments' },
    { value: 30, label: 'Journal Entry' },
    { value: 46, label: 'Outgoing Payments' },
  ];
  checkAll: boolean = true;


  constructor(private modalService: NgbModal,
    public authService: AuthService,
    private apiService: Service,
    private router: Router) { }

  ngOnInit(): void {
    this.getBIRTransactionsUploaded();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  checkIsLoggedIn() {
    this.apiService.validateIsLoggedIn(this.authService.getToken())
      .subscribe(
        res => {
          if (res.status === 'success') {
            this.authService.logout();
            this.router.navigate(['login']);
          }
        },
      );
  }
  getBIRTransactions() {
    this.apiService.bIRTransactions(this.transactionType, this.dateFrom, this.dateTo)
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
    const bir_transaction = new BIRTransaction;     
    const birTransactions = this.birTransactions.filter(key => key.selected == true);
    const token = this.authService.getToken();
    birTransactions.forEach((o: any) => {
      transactions.push(o.docEntry)
      
      bir_transaction.docentry = o.docEntry;
      bir_transaction.postingdate = this.trans_date = o.docDate;

      if (this.transactionType == 46) {
          this.apiService.bIRValidation(o.docEntry)
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(
            async res => {
            this.birValidation = res;
            if(this.birValidation.length == 1){

              this.apiService.addOutgoingPayments(transactions, token)
              .pipe(
                takeUntil(this.ngUnsubscribe)
              )
              .subscribe(
                res => {
                  this.getBIRTransactions();
                  Swal.close();
                  if (res.status == 'success')
                    Swal.fire('Transaction Uploaded!', res.message, 'success');
                  else
                    Swal.fire('Something Error!', res.message, 'error');
                },
                error => {
                  Swal.close();
                }
              );
            }else{
              Swal.fire('Outgoing Details is not fully uploaded!', 'error');
            }
            
          },
          error => {
            Swal.close();
          });
        }

       
    });
    
    if (this.transactionType == 204) {
      if(this.canupdate == true){
        this.apiService.addAPDPIEdit(bir_transaction, token)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            if (res.status == 'success')
              Swal.fire('Transaction Uploaded!', res.message, 'success');
            else
              Swal.fire('Something Error!', res.message, 'error');
          },
          error => {
            Swal.close();
          }
        );
      }else{
        this.apiService.addAPDPI(transactions, token)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            if (res.status == 'success')
              Swal.fire('Transaction Uploaded!', res.message, 'success');
            else
              Swal.fire('Something Error!', res.message, 'error');
          },
          error => {
            Swal.close();
          }
        );
      }
    }
    if (this.transactionType == 18) {
      if(this.canupdate == true){
        this.apiService.addAPInvoiceEdit(bir_transaction, token)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            if (res.status == 'success')
              Swal.fire('Transaction Uploaded!', res.message, 'success');
            else
              Swal.fire('Something Error!', res.message, 'error');
          },
          error => {
            Swal.close();
          }
        );
      }else{
        this.apiService.addAPInvoice(transactions, token)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            if (res.status == 'success')
              Swal.fire('Transaction Uploaded!', res.message, 'success');
            else
              Swal.fire('Something Error!', res.message, 'error');
          },
          error => {
            Swal.close();
          }
        );
      }
    }

    if (this.transactionType == 19) {
      if(this.canupdate == true){
        this.apiService.addAPCMEdit(bir_transaction, token)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            if (res.status == 'success')
              Swal.fire('Transaction Uploaded!', res.message, 'success');
            else
              Swal.fire('Something Error!', res.message, 'error');
          },
          error => {
            Swal.close();
          }
        );
      }else{
        this.apiService.addAPCM(transactions, token)
        .pipe(
          takeUntil(this.ngUnsubscribe)
        )
        .subscribe(
          res => {
            this.getBIRTransactions();
            Swal.close();
            if (res.status == 'success')
              Swal.fire('Transaction Uploaded!', res.message, 'success');
            else
              Swal.fire('Something Error!', res.message, 'error');
          },
          error => {
            Swal.close();
          }
        );
      }
    }
    if (this.transactionType == 24) {
      this.apiService.addIncommingPayments(transactions, token)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        res => {
          this.getBIRTransactions();
          Swal.close();
          if (res.status == 'success')
            Swal.fire('Transaction Uploaded!', res.message, 'success');
          else
            Swal.fire('Something Error!', res.message, 'error');
        },
        error => {
          Swal.close();
        }
      );
    }
    if (this.transactionType == 30) {
      if(this.canupdate == true){
        this.apiService.addJournalEntryEdit(bir_transaction, token)
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(
            res => {
              this.getBIRTransactions();
              Swal.close();
              if (res.status == 'success')
                Swal.fire('Transaction Uploaded!', res.message, 'success');
              else
                Swal.fire('Something Error!', res.message, 'error');
            },
            error => {
              Swal.close();
            }
          );
      }else{
        this.apiService.addJournalEntry(transactions, token)
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(
            res => {
              this.getBIRTransactions();
              Swal.close();
              if (res.status == 'success')
                Swal.fire('Transaction Uploaded!', res.message, 'success');
              else
                Swal.fire('Something Error!', res.message, 'error');
            },
            error => {
              Swal.close();
            }
          );
      }
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
    this.dateFrom = this.dateFrom;
    this.dateTo = this.dateTo;
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

  openViewApDownPaymentModal(ap: number, internal : boolean){
    const modalRef = this.modalService.open(ViewApDownpaymentComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.componentInstance.internal = internal;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }
  openViewApInvoiceModal(ap: number, internal : boolean){
    const modalRef = this.modalService.open(ViewApInvoiceComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.componentInstance.internal = internal;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }
  openViewApCreditMemoModal(ap: number, internal : boolean){
    const modalRef = this.modalService.open(ViewApCreditMemoComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.componentInstance.internal = internal;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }
  openViewOutgoingPayments(ap: number, internal : boolean){
    const modalRef = this.modalService.open(ViewOutgoingPaymentsComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.componentInstance.internal = internal;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }
  openViewJournalEntry(ap: number, internal : boolean){
    const modalRef = this.modalService.open(ViewJournalEntryComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.componentInstance.internal = internal;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }
  openViewIncomingPayments(ap: number, internal : boolean){
    const modalRef = this.modalService.open(ViewIncomingPaymentsComponent, { size: 'xl', backdrop: 'static' });
    modalRef.componentInstance.docNum = ap;
    modalRef.componentInstance.internal = internal;
    modalRef.result.then((result) => {
      if (result != 'close') {

      }
    }).catch((error) => {
      console.log(error);
    });
  }

}
