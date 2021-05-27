import {Component, OnInit} from '@angular/core';
import {Category} from "../../models/category";
import {CategoryService} from "../../services/category.service";
import {Toasts} from "../../helpers/toasts";

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  category: Category = new Category();
  isEmptyField: boolean = false;
  constructor(
    public categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  clearField() {
    this.category = new Category();
    this.isEmptyField = false;
  }

  newCategoryButtonHandler() {
    $('#categoryForm').modal('show');
    this.clearField();
  }

  editCategoryButtonHandler(category_id: number) {
    $('#categoryForm').modal('show');
    this.getCategory(category_id);
  }

  deleteCategoryButtonHandler(category: Category) {
    this.deleteCategory(category);
  }

  closeCategoryButtonHandler() {
    $('#categoryForm').modal('hide');
  }

  async saveButtonHandler() {
    this.checkEmptyFields();
    if(!this.isEmptyField) {
      if (this.category.product_category_id) {
        this.updateCategory();
      } else {
        this.saveCategory();
      }
    }
  }

  getCategory(category_id: number) {
    this.categoryService.getCategoryById(category_id).subscribe((res: Category) => {
      this.category = res;
    });
  }

  getCategoriesList() {
    this.categoryService.getAllCategories();
  }

  saveCategory() {
    this.categoryService.addCategory(this.category).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("A new category is added");
        this.getCategoriesList();
        this.clearField();
        this.closeCategoryButtonHandler();
      }
    });
  }

  updateCategory() {
    return this.categoryService.updateCategories(this.category).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The category " + this.category.title + " was updated");
        this.getCategoriesList();
        this.clearField();
        this.closeCategoryButtonHandler();
      }
    });
  }

  deleteCategory(category: Category) {
    return this.categoryService.deleteCategory(category.product_category_id).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.dangerToast( "The category " + category.title + " was deleted" );
        this.getCategoriesList();
        this.clearField();
      }
    });
  }


  checkEmptyFields() {
    if(!this.category.title) {
      this.isEmptyField = true;
      console.log(true);
    } else {
      this.isEmptyField =false;
      console.log(false);
    }
  }
}
