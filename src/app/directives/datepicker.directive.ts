import {AfterViewInit, Directive, ElementRef} from '@angular/core';

declare var $: any;
@Directive({
  selector: '[appDatepicker]'
})
export class DatepickerDirective implements AfterViewInit{

  constructor(
    private el:ElementRef
  ) { }

  ngAfterViewInit(): void {

  }
}
