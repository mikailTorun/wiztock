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

      title: 'Shipments',
      path: '/shipments',
      icon: 'fas fa-boxes'
    },
    {
      title: 'Products',
      path: '/products',
      icon: 'fas fa-boxes'
    },
    {
      label: 'Settings'
    },
    {
      title: 'Settings',
      path: '/',
      icon: 'fas fa-cogs',
      children: [
        {
          title:'Units',
          path: '/units'
        },
        {
          title:'Taxes',
          path: '/taxes'
        },
        {
          title:'Warehouses',
          path: '/warehouses'
        },
        {
          title:'Categories',
          path: '/categories'
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
