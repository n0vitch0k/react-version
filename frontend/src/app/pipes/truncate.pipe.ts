import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 30): string {
    if (!value) return '';
    const v = String(value);
    if (v.length <= limit) return v;
    return v.substring(0, limit).trimEnd() + '…';
  }
}
