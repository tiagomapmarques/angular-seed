import { PipeTransform } from '@angular/core';

export class TransparentPipe implements PipeTransform {
  /* tslint:disable:no-any */
  transform(value: any): any {
    /* tslint:enable:no-any */
    return value;
  }
}
