import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  sidebarItems: any = [
    {
      title: 'Dashboard',
      path: '/',
      icon: 'fas fa-tachometer-alt'
    },
    {
      title: 'Customers',
      path: '/customers',
      icon: 'fas fa-building'
    },
    {

      title: 'Supplier',
      path: '/suppliers',
      icon: 'far fa-building'
    },
    {
      label: 'Example'
    },
    {
      title: 'Layout Options',
      path: '/',
      icon: 'fas fa-tachometer-alt',
      children: [
        {
          title:'Top Navigation',
          path: '/'
        },
        {
          title:'Top Navigation + Sidebar',
          path: '/'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
