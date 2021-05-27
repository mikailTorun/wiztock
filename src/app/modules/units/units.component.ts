import {Component, OnInit} from '@angular/core';
import {Unit} from "../../models/unit";
import {Toasts} from "../../helpers/toasts";
import {UnitService} from "../../services/unit.service";

declare var $: any;

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  unit: Unit = new Unit();
  isEmptyField: boolean = false;
  constructor(
    public unitService: UnitService
  ) {
  }

  ngOnInit(): void {
    this.getUnitList();
  }

  clearField() {
    this.unit = new Unit();
    this.isEmptyField = false;
  }

  newUOFButtonHandler() {
    $('#uofForm').modal('show');
    this.clearField();
  }

  editUnitButtonHandler(uom_id: number) {
    $('#uofForm').modal('show');
    this.getUnit(uom_id);
  }

  deleteUnitButtonHandler(unit: Unit) {
    this.deleteUnit(unit);
  }

  closeUnitButtonHandler() {
    $('#uofForm').modal('hide');
  }

  async saveButtonHandler() {
    this.checkEmptyFields();
    if(!this.isEmptyField) {
      if (this.unit.uom_id) {
        this.updateUnit();
      } else {
        this.saveUnit();
      }
    }

  }

  getUnit(uom_id: number) {

    this.unitService.getUnitById(uom_id).subscribe((res: Unit) => {
      this.unit = res;
    });

  }

  getUnitList() {
    this.unitService.getAllUnit();
  }

  saveUnit() {
    console.log(this.unit);
    this.unitService.addUnit(this.unit).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("A new unit of measurement is added");
        this.getUnitList();
        this.clearField();
        this.closeUnitButtonHandler();
      }
    });
  }

  updateUnit() {
    return this.unitService.updateUnit(this.unit).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The category " + this.unit.title + " was updated");
        this.getUnitList();
        this.clearField();
        this. closeUnitButtonHandler();
      }
    });


  }

  deleteUnit(unit: Unit) {
    return this.unitService.deleteUnit(unit.uom_id).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.dangerToast( "The category " + unit.title + " was deleted" );
        this.getUnitList();
        this.clearField();
      }
    });


  }


  checkEmptyFields() {
    if(!this.unit.title) {
      this.isEmptyField = true;
    } else {
      this.isEmptyField =false;

    }
  }
}
