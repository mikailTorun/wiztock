import {Injectable} from "@angular/core";

declare var $: any;

@Injectable()
export class Toasts {
  constructor() {
  }

  private static toast(title: string, message: string, delay:number, autoHide:boolean, type: string) {
    $(document).Toasts('create', {
      class: type,
      title: title,
      delay: delay,
      autohide: autoHide,
      body: message
    });
  }

  static successToast(message: string, title: string = "Information", delay: number =3000, autoHide: boolean = true) {
    this.toast(title, message, delay, autoHide, "bg-success");
  }

  static dangerToast(message: string, title: string = "Warning", delay: number = 3000, autoHide: boolean = true) {
    this.toast(title, message, delay, autoHide, "bg-danger");
  }

  static warningToast(message: string, title: string = "Information", delay: number = 3000, autoHide: boolean = true) {
    this.toast(title, message, delay, autoHide, "bg-warning");
  }
}
