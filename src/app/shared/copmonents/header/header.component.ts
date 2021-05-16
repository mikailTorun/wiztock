import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authSerivce: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authSerivce.logout();
  }

}
