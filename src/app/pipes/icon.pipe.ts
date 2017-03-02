import { Pipe, PipeTransform } from '@angular/core';
import { IconType, IconTypes } from '../types';

@Pipe({
  name: 'icon',
})
export class IconPipe implements PipeTransform {

  transform(value: IconType): string {
    return IconTypes.toJson(value);
  }
}
