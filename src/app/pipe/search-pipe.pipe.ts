import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../data/product';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: IProduct[], query: string): IProduct[] {
    if(value.length===0||!query) return value;
    return [...value.filter(val=>val.name.toLowerCase().includes(query.toLowerCase()))];
  }

}
