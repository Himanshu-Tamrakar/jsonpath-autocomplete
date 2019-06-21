import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], searchText:string): any[] {
    
    if(!data) return [];
    if(!searchText) return data;
    if(searchText == '') return data;

    searchText = searchText.toLowerCase();

    return data.filter((it) => {
      return it.toLowerCase().includes(searchText);
    })

  }

}
