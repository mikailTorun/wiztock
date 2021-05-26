import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/category";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  category: Category = new Category();
  constructor() { }

  ngOnInit(): void {
  }


  addCategoryButtonHandler() {
    console.log(this.category.title);
    console.log(this.category.description);
  }
}
