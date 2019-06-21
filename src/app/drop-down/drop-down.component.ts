import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {
  public dropdownList:object = [];
  public sText:string = '';
  @Input('searchText') set searchText(v: string) {
    console.log("got", v)
    this.sText = v;
  }

  @Input('dropDownObject') set dropDownObject(v: object) {
    this.dropdownList = v;
  }
  @Output() dropDownEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

}
