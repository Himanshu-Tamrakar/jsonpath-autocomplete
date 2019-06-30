import { Pipe, PipeTransform } from '@angular/core';
import { SubscribalService } from '../services/subscribal.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private subscribalService:SubscribalService) {}

  transform(data: any[], searchText:string): any[] {

    if(!data) return [];
    if(!searchText) return data;
    if(searchText == '') return data;

    searchText = searchText.toLowerCase();

    let dataA =  data.filter((it) => {
      return it.toLowerCase().includes(searchText);
    })
    debugger
    this.subscribalService.setFiteredSuggestedArrayOption(dataA);
    return dataA;
  }

}
