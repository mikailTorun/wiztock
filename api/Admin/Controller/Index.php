<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';

require_once 'Employee.php';
require_once 'Company.php';
require_once 'Customer.php';
require_once 'Product.php';
require_once 'Category.php';
require_once 'Unit.php';
require_once 'Tax.php';
require_once 'Warehouse.php';
require_once 'Shipment.php';

$Customer   = new Customer();
$Product    = new Product();
$Category   = new Category();
$Unit       = new Unit();
$tax        = new Tax();
$warehouse  = new Warehouse();
$shipment   = new Shipment();
$company    = new Company();
$employee    = new Employee();

if (strcmp($_POST["func"] , "getProductStockInformationById") == 0) {
    $Product->getProductStockInformationById();
}
if (strcmp($_POST["func"] , "addShipment") == 0) {
    $shipment->addShipment();
}
if (strcmp($_POST["func"] , "getShipmentById") == 0) {
    $shipment->getShipmentById();
}
if (strcmp($_POST["func"] , "getAllShipment") == 0) {
    $shipment->getAllShipment();
}
if (strcmp($_POST["func"] , "updateEmployee") == 0) {
    $employee->updateEmployee();
}
if (strcmp($_POST["func"] , "deleteEmployee") == 0) {
    $employee->deleteEmployee();
}
if (strcmp($_POST["func"] , "getAllEmployee") == 0) {
    $employee->getAllEmployee();
}
if (strcmp($_POST["func"] , "addEmployee") == 0) {
    $employee->addEmployee();
}
if (strcmp($_POST["func"] , "updateCompany") == 0) {
    $company->updateCompany();
}
if (strcmp($_POST["func"] , "register") == 0) {
    $company->addCompany();
}
if (strcmp($_POST["func"] , "getCompany") == 0) {
    $company->getCompany();
}
if (strcmp($_POST["func"] , "getAllShipmentType") == 0) {
    $shipment->getAllShipmentType();
}
if (strcmp($_POST["func"] , "loginFunction") == 0) {
    $employee->login();
}
if (strcmp($_POST["func"] , "funcInsertCustomer") == 0) {
    $Customer->insertCustomer();
}
if (strcmp($_POST["func"] , "getCustomerList") == 0) {
    $Customer->getCustomerList();
}
if (strcmp($_POST["func"] , "getAllCustomer") == 0) {
    $Customer->getAllCustomer();
}
if (strcmp($_POST["func"] , "getCustomer") == 0) {
    $Customer->getCustomer();
}
if (strcmp($_POST["func"] , "addCustomer") == 0) {
    $Customer->addCustomer();
}
if (strcmp($_POST["func"] , "getAllSupplier") == 0) {
    $Customer->getAllSupplier();
}
if (strcmp($_POST["func"] , "updateCustomer") == 0) {
    $Customer->updateCustomer();
}

if (strcmp($_POST["func"] , "addProduct") == 0) {
    $Product->addProduct();
}
if (strcmp($_POST["func"] , "getProductById") == 0) {
    $Product->getProductById();
}
if (strcmp($_POST["func"] , "updateProduct") == 0) {
    $Product->updateProduct();
}
if (strcmp($_POST["func"] , "deleteProduct") == 0) {
    $Product->deleteProduct();
}
if (strcmp($_POST["func"] , "getAllProduct") == 0) {
    $Product->getAllProduct();
}
if (strcmp($_POST["func"] , "addCategory") == 0) {
    $Category->addCategory();
}
if (strcmp($_POST["func"] , "getAllCategories") == 0) {
    $Category->getAllCategories();
}
if (strcmp($_POST["func"] , "getCategoryById") == 0) {
    $Category->getCategoryById();
}
if (strcmp($_POST["func"] , "updateCategory") == 0) {
    $Category->updateCategory();
}
if (strcmp($_POST["func"] , "deleteCategory") == 0) {
    $Category->deleteCategory();
}
if (strcmp($_POST["func"] , "addUnit") == 0) {
    $Unit->addUnit();
}
if (strcmp($_POST["func"] , "getAllUnit") == 0) {
    $Unit->getAllUnit();
}
if (strcmp($_POST["func"] , "getUnitById") == 0) {
    $Unit->getUnitById();
}
if (strcmp($_POST["func"] , "updateUnit") == 0) {
    $Unit->updateUnit();
}
if (strcmp($_POST["func"] , "deleteUnit") == 0) {
    $Unit->deleteUnit();
}
if (strcmp($_POST["func"] , "getAllTax") == 0) {
    $tax->getAllTax();
}
if (strcmp($_POST["func"] , "addTax") == 0) {
    $tax->addTax();
}
if (strcmp($_POST["func"] , "deleteTax") == 0) {
    $tax->deleteTax();
}
if (strcmp($_POST["func"] , "getTaxById") == 0) {
    $tax->getTaxById();
}
if (strcmp($_POST["func"] , "updateTax") == 0) {
    $tax->updateTax();
}
if (strcmp($_POST["func"] , "getAllWarehouse") == 0) {
    $warehouse->getAllWarehouse();
}
if (strcmp($_POST["func"] , "addWarehouse") == 0) {
    $warehouse->addWarehouse();
}
if (strcmp($_POST["func"] , "getWarehouseById") == 0) {
    $warehouse->getWarehouseById();
}
if (strcmp($_POST["func"] , "updateWarehouse") == 0) {
    $warehouse->updateWarehouse();
}
if (strcmp($_POST["func"] , "deleteWarehouse") == 0) {
    $warehouse->deleteWarehouse();
}
