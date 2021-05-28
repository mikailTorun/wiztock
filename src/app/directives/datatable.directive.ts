import {AfterViewInit, Directive, ElementRef} from '@angular/core';
declare var $: any;
@Directive({
  selector: '[appDatatable]'
})
export class DatatableDirective implements AfterViewInit{

  constructor(private el:ElementRef) { }

  ngAfterViewInit() {
    let el =this.el.nativeElement

    setTimeout(function (){
      $(function (){
        $(el).DataTable();
      })
    }, 3000);

    $().DataTable();
  }
}
