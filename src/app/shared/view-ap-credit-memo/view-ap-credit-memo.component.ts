import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { BIRData, Service } from 'src/app/core/api.client.generated';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-ap-credit-memo',
  templateUrl: './view-ap-credit-memo.component.html',
  styleUrls: ['./view-ap-credit-memo.component.scss']
})
export class ViewApCreditMemoComponent implements OnInit {

  private ngUnsubscribe = new Subject<void>();
  birdata: BIRData = new BIRData;
  docNum: number = 0;
  internal: boolean = false;
  transactionType = 19;
  branch: string = "";
  constructor(private apiService: Service,
    public authService: AuthService,
    private activeModal: NgbActiveModal) { }
    
    ngOnInit(): void {
      this.getBIRData();
    }
    getBIRData(){
      this.branch = this.authService.getDB();
      this.apiService.bir_data(this.transactionType,this.docNum, this.internal, this.branch)
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

