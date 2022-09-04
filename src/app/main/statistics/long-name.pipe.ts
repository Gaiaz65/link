import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionPipe',
})
export class LongnamePipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 50) {
      return value.substr(0, 40) + ' ...';
    }
    return value;
  }
}
