import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import jp from 'jsonpath/jsonpath.min';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, flatMap, map, tap } from 'rxjs/operators';
import { SubscribalService } from '../core/services/subscribal.service';
import { CommanService } from '../core/services/comman.service';

@Component({
  selector: 'app-object-autocomplete',
  templateUrl: './object-autocomplete.component.html',
  styleUrls: ['./object-autocomplete.component.css']
})
export class ObjectAutocompleteComponent {
  public keyUp = new Subject<string>();
  public suggestionArray: object = [];
  public searchText: string = '';
  public lastJsonPathCalculated: '';

  public v = ""; public v1: ''; public erro;
  @ViewChild('inputBox') iB: ElementRef;
  public jsonObject: any

  constructor(public subscribalService: SubscribalService, private CommanService: CommanService) {
    this.getData();

    const sub = this.subscribalService.returnSubjectKey('KEY_UP').pipe(
      debounceTime(10),
      map(event => this.onKey(event))
    ).subscribe();

    this.subscribalService.returnSubjectKey('KEY_TO_APPEND').pipe(
      debounceTime(10),
      map(event => this.appendKey(event))
    ).subscribe();
  }

  /**
   * [getData Gets the data from json file]
   * @return [description]
   */
  private getData() {
    this.CommanService.getAutoCompleteObject().subscribe((r) => {
      this.jsonObject = r['parsorObject'];
    }, (err) => {
      this.jsonObject = {};
    })
  }

  /**
   * [onKey methed call on every key press]
   * @param  path [description]
   * @return      [description]
   */
  private onKey(path: string) {
    if (path == '' || path == undefined) {
      this.subscribalService.setSuggestedArray([]); this.setSeachText(this.getSearchText('', false));
    }
    const dummyPath = path;
    const pathBeforeLastDot = path.split('.'); pathBeforeLastDot.pop();

    //get data till path
    let result = this.getValueFromPath(dummyPath, this.jsonObject);
    //get data till before last dot
    let resultBeforeLastDot = this.getValueFromPath(pathBeforeLastDot.join('.'), this.jsonObject);

    //* means it is not able to retrieve data due to wrong path or something else if complete path wo
    if (result != '*' && result.length > 0) {
      this.setSuggestedArray(result);
      this.setSeachText(this.getSearchText('', false));
    } else {
      if (resultBeforeLastDot != '*' && resultBeforeLastDot.length > 0) {
        this.setSuggestedArray(resultBeforeLastDot);
        this.setSeachText(this.getSearchText(path, true))
      } else {
        this.subscribalService.setSuggestedArray([]); this.setSeachText(this.getSearchText('', false));
      }
    }
  }

  /**
   * [getSearchText gives the searchable text]
   * @param  path            [description]
   * @param  needToCalculate [description]
   * @return                 [description]
   */
  private getSearchText(path: string, needToCalculate: boolean): string {
    if (!needToCalculate) return '';

    let tA = path.split('.');
    return tA[tA.length - 1];
  }

  /**
   * [setSuggestedArray set the value for suggestion array, and sets its value through service]
   * @param  jsonPathValue [description]
   * @return               [description]
   */
  private setSuggestedArray(jsonPathValue) {
    if (typeof jsonPathValue[0] == 'string' || typeof jsonPathValue[0] == 'number' || typeof jsonPathValue[0] == 'boolean' || typeof jsonPathValue[0] == null) {
      this.suggestionArray = [];
    } else if (typeof jsonPathValue[0] == 'object') {
      if (Array.isArray(jsonPathValue[0]) && jsonPathValue[0].length > 0) {
        let tempArr = <any[]>Object.keys(jsonPathValue[0]); tempArr.unshift('*');
        this.suggestionArray = tempArr;
      } else this.suggestionArray = Object.keys(jsonPathValue[0]);
    }

    this.subscribalService.setSuggestedArray(<any[]>this.suggestionArray);
  }

  /**
   * [getValueFromPath retrive the value from the path]
   * @param  path        [description]
   * @param  objectValue [description]
   * @return             [description]
   */
  private getValueFromPath(path, objectValue): any {
    try {
      return jp.query(objectValue, path);
    } catch (err) {
      return '*';
    }
  }

  /**
   * [setSeachText sets the searchable text for given suggestion array]
   * @param  sT [description]
   * @return    [description]
   */
  private setSeachText(sT: string): void {
    this.searchText = JSON.parse((JSON.stringify(sT)));
  }


  /**
   * [appendKey appends the key on input box and publish its value]
   * @param  keyName [description]
   * @return         [description]
   */
  private appendKey(keyName: any) {
    debugger
    if(keyName == undefined) return;
    let inputValue = this.iB.nativeElement.value.trim();
    let keyArr = inputValue.split('.');
    //If last element is '', in case of $.state. => enter
    if(keyArr[keyArr.length-1] == '') keyArr.pop();

    let result = this.getValueFromPath(inputValue, this.jsonObject);

    if(result != '*') {
      // $.stat he is entered and press enter
      if(result[0] == undefined) keyArr[keyArr.length-1] = keyName;

      else keyArr.push(keyName);
    } else {
        keyArr.push(keyName);
    }

    //join all the key and publish the value
    this.iB.nativeElement.value = keyArr.join(".");
    this.subscribalService.publishValue('KEY_UP', this.iB.nativeElement.value);
  }



  // test(v) {
  //   try {
  //     this.v = jp.query(this.jsonObject, v);
  //     this.v1 = jp.query(this.jsonObject, v)[0];
  //
  //     console.log(typeof this.v1)
  //
  //     this.erro = ''
  //   } catch (err) {
  //     console.log(err)
  //     this.erro = err;
  //   }
  //
  // }

}
