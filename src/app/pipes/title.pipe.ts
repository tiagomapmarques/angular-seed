import { Pipe, PipeTransform } from '@angular/core';
import { TitleType, TitleTypes } from '../models';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {

  transform(value: TitleType): string {
    const title = TitleTypes.toJson(value).toLowerCase();
    return title && (title.charAt(0).toUpperCase() + title.slice(1));
  }
}
