import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {
  public dropdownList:object = [];

  @Input('dropDownObject') set dropDownObject(v: object) {
    console.log('Input')
    this.dropdownList = v;
  }
  @Output() dropDownEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit')
  }

}
