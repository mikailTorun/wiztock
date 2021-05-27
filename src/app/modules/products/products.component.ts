import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {UnitService} from "../../services/unit.service";
import {TaxService} from "../../services/tax.service";
import {Tax} from "../../models/tax";
import {Toasts} from "../../helpers/toasts";
import {Unit} from "../../models/unit";

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product!: Product;
  isEmptyField!: boolean;
  tax: number = 0;
  taxObj!: Tax;

  constructor(
    public productService: ProductService,
    public categoryService: CategoryService,
    public unitService: UnitService,
    public taxService: TaxService
  ) {
  }

  ngOnInit(): void {
    this.productService.getAllProduct();
    this.categoryService.getAllCategories();
    this.unitService.getAllUnit();
    this.taxService.getAllTax();
    this.clearField();
  }

  clearField() {
    this.product = new Product();
    this.isEmptyField =false;
  }

  newProductButtonHandler() {
    $('#productForm').modal('show');
    this.clearField();
    this.product.product_category_id = this.categoryService.categories[0].product_category_id;
    this.product.uom_id = this.unitService.units[0].uom_id;
    this.product.tax_id = this.taxService.taxes[0].tax_id;
    this.taxObj = this.taxService.taxes[0];
    this.tax = this.taxObj.rate;
  }

  editUnitButtonHandler(product_id: number) {
    $('#unitForm').modal('show');
    this.getProduct(product_id);
  }

  deleteUnitButtonHandler(product: Product) {
    this.deleteProduct(product);
  }

  closeButtonHandler() {
    $('#productForm').modal('hide');
  }


  saveButtonHandler() {
    this.checkEmptyFields();
    if(!this.isEmptyField) {
      if (this.product.product_id) {
        this.updateProduct();
      } else {
        this.saveProduct();
      }
    }
  }

  getProduct(product_id: number) {
    this.productService.getProductById(product_id).subscribe((res: Product) => {
      this.product = res;
    });
  }

  getProductList() {
    this.productService.getAllProduct();
  }

  saveProduct() {
    this.productService.addProduct(this.product).subscribe((res:any)=>{
      if (res["success"]) {
        Toasts.successToast("A new tax of measurement is added");
        this.getProductList();
        this.clearField();
      }
    });
  }

  updateProduct() {
    return this.productService.updateProduct(this.product).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The category " + this.product.product_name + " was updated");
        this.getProductList();
        this.clearField();
        this. closeButtonHandler();
      }
    });
  }

  deleteProduct(product: Product) {
    return this.productService.deleteProduct(product.product_id).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.dangerToast( "The category " + product.product_name + " was deleted" );
        this.getProductList();
        this.clearField();
      }
    });
  }

  changeSellingPriceHandler(event: any) {
    const taxAmount = this.tax / 100.0 + 1;
    let pPrice = parseFloat(event.target.value) / taxAmount;
    this.product.purchasing_price = pPrice ? pPrice : 0;
  }

  changePurchasingHandler(event: any) {
    this.product.purchasing_price = parseFloat(event.target.value ? event.target.value : 0);
    this.calculateSellingPrice();
  }

  setTax(tax: Tax) {
    this.tax = tax.rate;
    this.product.tax_id = tax.tax_id;
    this.calculateSellingPrice();
  }

  calculateSellingPrice() {
    const taxAmount = this.tax / 100.0 + 1;
    let sPrice = this.product.purchasing_price * taxAmount;
    this.product.selling_price = sPrice ? sPrice : 0;
  }

  checkEmptyFields() {
    if(!this.product.product_name) {
      this.isEmptyField = true;
    } else {
      this.isEmptyField =false;

    }
  }

}
