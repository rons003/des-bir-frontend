import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { BIRData, Service } from 'src/app/core/api.client.generated';

@Component({
  selector: 'app-view-outgoing-payments',
  templateUrl: './view-outgoing-payments.component.html',
  styleUrls: ['./view-outgoing-payments.component.scss']
})
export class ViewOutgoingPaymentsComponent implements OnInit {

  private ngUnsubscribe = new Subject<void>();
  birdata: BIRData = new BIRData;
  docNum: number = 0;
  internal: boolean = false;
  transactionType = 46;
  constructor(private apiService: Service,
    private activeModal: NgbActiveModal) { }
    
    ngOnInit(): void {
      this.getBIRData();
    }
    getBIRData(){
      this.apiService.bir_data(this.transactionType, this.docNum, this.internal)
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
