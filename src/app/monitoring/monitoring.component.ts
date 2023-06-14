import { Component, Injectable, OnInit } from '@angular/core';
import { NgbDateStruct, NgbModal, NgbTimeAdapter, NgbTimeStruct, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  dpFrom: NgbDateStruct | undefined;
  dpTo: NgbDateStruct | undefined;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openXl(content: any) {
    this.modalService.open(content, { size: 'xl', backdrop: 'static' });
  }

}
