import {Component, OnInit} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {UnitService} from "../../services/unit.service";
import {TaxService} from "../../services/tax.service";
import {Tax} from "../../models/tax";
import {Toasts} from "../../helpers/toasts";

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  product: Product = new Product();
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
    this.categoryService.getAllCategories();
    this.unitService.getAllUnit();
    this.taxService.getAllTax();
  }

  newProductButtonHandler() {
    $('#productForm').modal('show');
    this.product.product_category_id = this.categoryService.categories[0].product_category_id;
    this.product.uom_id = this.unitService.units[0].uom_id;
    this.product.tax_id = this.taxService.taxes[0].tax_id;
    this.taxObj = this.taxService.taxes[0];
    this.tax = this.taxObj.rate;
  }

  closeButtonHandler() {
    $('#productForm').modal('hide');
  }

  saveButtonHandler() {
    this.saveProduct();
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

  saveProduct() {
    this.productService.addProduct(this.product).subscribe((res:any)=>{
      if (res["success"]) {
        Toasts.successToast("A new tax of measurement is added");

      }
    });
  }

}
