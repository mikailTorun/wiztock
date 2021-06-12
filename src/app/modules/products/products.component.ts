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
  product!: Product;
  isEmptyField!: boolean;
  tax: number = 0;
  taxSelected!: number;
  stock!: any;

  productInformation: any;

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
    this.productService.getAllProduct();
    this.clearField();
  }




  clearField() {
    this.product = new Product();
    this.isEmptyField = false;
  }

  newProductButtonHandler() {
    $('#productForm').modal('show');
    this.taxSelected = this.taxService.taxes[0].tax_id;
    this.clearField();
    this.product.product_category_id = this.categoryService.categories[0].product_category_id;
    this.product.uom_id = this.unitService.units[0].uom_id;
    this.product.tax_id = this.taxService.taxes[0].tax_id;
    const taxObj = this.taxService.taxes[0];
    this.tax = taxObj.rate;
  }

  editProductButtonHandler(product_id: number) {
    $('#productForm').modal('show');
    this.getProduct(product_id);
  }

  deleteProductButtonHandler(product: Product) {
    this.deleteProduct(product);
  }

  closeButtonHandler() {
    this.closeDialog();
  }

  closeDialog() {
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
      this.taxService.getTaxById(res.tax_id).subscribe((res: Tax) => {
        this.changeTaxSelectHandler(res.tax_id);
      });
    });
  }


  getProductList() {
    this.productService.getAllProduct();
  }

  saveProduct() {
    this.productService.addProduct(this.product).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("A new product of measurement is added.");
        this.getProductList();
        this.closeDialog();
        this.clearField();
      }
    });
  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The product " + this.product.product_name + " was updated");
        this.getProductList();
        this.closeDialog();
        this.clearField();
      }
    });

  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.product_id)
      .subscribe((res: any) => {
        if (res["success"]) {
          Toasts.dangerToast("The product " + product.product_name + " was deleted");
          this.getProductList();
          this.closeDialog();
          this.clearField();
        }
      });
  }

  changeSellingPriceHandler(event: any) {
    const taxAmount = this.tax / 100.0 + 1;
    let pPrice = parseFloat((parseFloat(event.target.value) / taxAmount).toFixed(2));
    this.product.purchasing_price = pPrice ? pPrice : 0;
  }

  changePurchasingHandler(event: any) {
    this.product.purchasing_price = parseFloat(event.target.value ? event.target.value : 0);
    this.calculateSellingPrice();
  }

  changeTaxSelectHandler(tax_id: number) {
    const taxObj = this.taxService.taxes.find(tax => tax.tax_id === tax_id);
    this.taxSelected = taxObj ? taxObj.tax_id : 0;
    if (taxObj) {
      this.tax = taxObj.rate;
      this.product.tax_id = taxObj.tax_id;
    }
    this.calculateSellingPrice();
  }

  calculateSellingPrice() {
    const taxAmount = (this.tax / 100.0 + 1);
    let sPrice = 100.0 * (this.product.purchasing_price * taxAmount) / 100.0;
    this.product.selling_price = sPrice ? sPrice : 0;
  }

  checkEmptyFields() {
    if (!this.product.product_name) {
      this.isEmptyField = true;
    } else {
      this.isEmptyField = false;
    }
  }

  viewProductButtonHandler(product: Product) {
    this.product = product;
    $('#productInformation').modal('show');
    this.productService.getProductStockInformationById(product.product_id).subscribe( (res: any) => {
      this.productInformation = res;
    });
  }

  closeProductInformationButtonHandler() {
    $('#productInformation').modal('hide');
  }
}
