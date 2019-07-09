import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubscribalService } from '../core/services/subscribal.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent {
  public dropdownList: any = [];
  public sText: string = '';
  public selectedIndex = 0;
  @Input('searchText') set searchText(v: string) {
    this.sText = v;
  }

  constructor(public subscribalService: SubscribalService) {
    this.subscribalService.returnSubjectKey('ITEM_INDEX').subscribe((value) => {
      this.selectedIndex = value;
    });

    this.subscribalService.returnSubjectKey('SUGGESTED_ARRAY').subscribe((obj:any[]) => {
      this.dropdownList = obj;
    })
  }
}
