import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubscribalService } from '../core/services/subscribal.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {
  public dropdownList:any = [];
  public sText:string = '';
  public selectedIndex=0;
  @Input('searchText') set searchText(v: string) {
    this.sText = v;
  }

  // @Input('dropDownObject') set dropDownObject(v: object) {
  //   this.dropdownList = v;
  // }
  @Output() dropDownEmitter = new EventEmitter<any>();

  constructor(public subscribalService:SubscribalService) {
    this.subscribalService.returnSubjectKey('ITEM_INDEX').subscribe((value) => {
      this.selectedIndex = value;
    });

    this.subscribalService.returnSubjectKey('SUGGESTED_ARRAY').subscribe((obj) => {
      if(Array.isArray(obj)) this.dropdownList = obj;
    })
  }

  ngOnInit() {}

  emit(value:any) {
    this.dropDownEmitter.emit(value);
  }

  // onItemClick(value) {
  //   this.subscribalService.publishValue('KEY_TO_APPEND',value);
  // }

}
