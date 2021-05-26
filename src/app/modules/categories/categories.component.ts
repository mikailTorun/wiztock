import { Component, OnInit } from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  category: Category = new Category();
  constructor(
    public categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.categoryService.getAllCategories();
  }

  addCategoryButtonHandler() {
    this.categoryService.addCategory(this.category);
  }

  getCategory() {

  }

  deleteCategoryButtonHandler(product_category_id: number) {

  }

}
