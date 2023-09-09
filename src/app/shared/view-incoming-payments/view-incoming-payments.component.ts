import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { IncomingPayments, Service } from 'src/app/core/api.client.generated';

@Component({
  selector: 'app-view-incoming-payments',
  templateUrl: './view-incoming-payments.component.html',
  styleUrls: ['./view-incoming-payments.component.scss']
})
export class ViewIncomingPaymentsComponent implements OnInit {

  private ngUnsubscribe = new Subject<void>();
  birdata: IncomingPayments = new IncomingPayments;
  internal: boolean = false;
  docNum: number = 0;
  transactionType = 24;
  constructor(private apiService: Service,
    private activeModal: NgbActiveModal) { }

    ngOnInit(): void {
      this.getBIRData();
    }
    getBIRData(){
      this.apiService.bir_data(this.transactionType,this.docNum, this.internal)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(res => {
        this.birdata = res;
        console.log(res);
      });
    }
    ngOnDestroy(): void {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  
    closeModal() {
      this.activeModal.close('close');
    }

}
