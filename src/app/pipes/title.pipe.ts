import { Pipe, PipeTransform } from '@angular/core';
import { TitleType, TITLE } from '../types';

const capitalize = (title: string) => title.charAt(0).toUpperCase() + title.slice(1);

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {

  transform(value: TitleType): string {
    const title = TITLE.map(value);
    return title && capitalize(title);
  }
}
