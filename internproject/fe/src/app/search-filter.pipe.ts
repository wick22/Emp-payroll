import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();
    return value.filter(function (data) {
      console.log(data);
      data = data.fname.toLowerCase();
      if (data.startsWith(args) || data.includes(args)) {
        return true;
      }
      return false;
    });
  }
}
