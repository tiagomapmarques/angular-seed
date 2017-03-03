import { Pipe, PipeTransform } from '@angular/core';
import { IconType, ICON } from '../types';

@Pipe({
  name: 'icon',
})
export class IconPipe implements PipeTransform {

  transform(value: IconType): string {
    return ICON.toJson(value);
  }
}
