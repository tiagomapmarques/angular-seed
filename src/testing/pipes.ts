import { PipeTransform } from '@angular/core';

type Data = number|string|boolean|Object;
type AnyData = Data|Data[];

export class TransparentPipe implements PipeTransform {
  static transform(value: AnyData): AnyData {
    return value;
  }

  transform(value: AnyData): AnyData {
    return TransparentPipe.transform(value);
  }
}

export class TestPipe implements PipeTransform {
  static transform(value: AnyData): string {
    return `TestPipe::${JSON.stringify(value)}`;
  }

  transform(value: AnyData): string {
    return TestPipe.transform(value);
  }
}
