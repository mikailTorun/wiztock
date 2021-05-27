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
    if(this.category.product_category_id) {
      this.updateCategory();
    } else {
      this.saveCategory();
    }
    this.getCategoriesList();
    this.clearFieldButtonHandler();
  }

  getCategory(category_id: number) {
    this.categoryService.getCategoryById(category_id).subscribe((res:Category) => {
      this.category = res;
    });
  }

  deleteCategoryButtonHandler(product_category_id: number) {
    this.categoryService.deleteCategory(product_category_id);
  }

  saveCategory() {
    this.categoryService.addCategory(this.category);
  }

  updateCategory() {
    this.categoryService.updateCategories(this.category);
  }

  clearFieldButtonHandler() {
    this.category = new Category();
  }
}
