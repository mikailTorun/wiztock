<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';
require_once 'Employee.php';
require_once 'Company.php';
require_once 'Customer.php';
require_once 'Product.php';
require_once 'Category.php';
require_once 'Unit.php';
require_once 'Tax.php';
require_once 'Warehouse.php';
require_once 'Shipment.php';
//use Exception;
//use ArrayObject;
//session_start();

/*
class Index extends AppParent{
    public function __construct() {
        
    }
    public function dumpResponse ($response) {
        ob_clean();
        echo json_encode($response);
        return true;
    }
}
*/
$login      = new DatabaseFunc();
$Customer   = new Customer();
$Product    = new Product();
$Category   = new Category();
$Unit       = new Unit();
$tax        = new Tax();
$warehouse  = new Warehouse();
$shipment   = new Shipment();
$company    = new Company();
$employee    = new Employee();

if (strcmp($_POST["func"] , "addShipment") == 0) {
    AppPArent::dumpResponse( $shipment->addShipment());
}
if (strcmp($_POST["func"] , "getAllShipment") == 0) {
    AppPArent::dumpResponse( $shipment->getAllShipment());
}
if (strcmp($_POST["func"] , "updateEmployee") == 0) {
    AppPArent::dumpResponse( $employee->updateEmployee());
}
if (strcmp($_POST["func"] , "deleteEmployee") == 0) {
    AppPArent::dumpResponse( $employee->deleteEmployee());
}
if (strcmp($_POST["func"] , "getAllEmployee") == 0) {
    AppPArent::dumpResponse( $employee->getAllEmployee());
}
if (strcmp($_POST["func"] , "addEmployee") == 0) {
    AppPArent::dumpResponse( $employee->addEmployee());
}
if (strcmp($_POST["func"] , "updateCompany") == 0) {
    AppPArent::dumpResponse( $company->updateCompany());
}
if (strcmp($_POST["func"] , "register") == 0) {
    AppPArent::dumpResponse( $company->addCompany());
}
if (strcmp($_POST["func"] , "getCompany") == 0) {
    AppPArent::dumpResponse( $company->getCompany());
}
if (strcmp($_POST["func"] , "getAllShipmentType") == 0) {
    AppPArent::dumpResponse( $shipment->getAllShipmentType());
}
if (strcmp($_POST["func"] , "loginFunction") == 0) {
    AppPArent::dumpResponse( $login->login());
}
if (strcmp($_POST["func"] , "funcInsertCustomer") == 0) {
    AppPArent::dumpResponse( $Customer->insertCustomer());
}
if (strcmp($_POST["func"] , "getCustomerList") == 0) {
    AppPArent::dumpResponse( $Customer->getCustomerList());
}
if (strcmp($_POST["func"] , "getAllCustomer") == 0) {
    AppPArent::dumpResponse( $Customer->getAllCustomer());
}
if (strcmp($_POST["func"] , "getCustomer") == 0) {
    AppPArent::dumpResponse( $Customer->getCustomer());
}
if (strcmp($_POST["func"] , "addCustomer") == 0) {
    AppPArent::dumpResponse( $Customer->addCustomer());
}
if (strcmp($_POST["func"] , "getAllSupplier") == 0) {
    AppPArent::dumpResponse( $Customer->getAllSupplier());
}
if (strcmp($_POST["func"] , "updateCustomer") == 0) {
    AppPArent::dumpResponse( $Customer->updateCustomer());
}

if (strcmp($_POST["func"] , "addProduct") == 0) {
    AppPArent::dumpResponse( $Product->addProduct());
}
if (strcmp($_POST["func"] , "getProductById") == 0) {
    AppPArent::dumpResponse( $Product->getProductById());
}
if (strcmp($_POST["func"] , "updateProduct") == 0) {
    AppPArent::dumpResponse( $Product->updateProduct());
}
if (strcmp($_POST["func"] , "deleteProduct") == 0) {
    AppPArent::dumpResponse( $Product->deleteProduct());
}
if (strcmp($_POST["func"] , "getAllProduct") == 0) {
    AppPArent::dumpResponse( $Product->getAllProduct());
}
if (strcmp($_POST["func"] , "addCategory") == 0) {
    AppPArent::dumpResponse( $Category->addCategory());
}
if (strcmp($_POST["func"] , "getAllCategories") == 0) {
    AppPArent::dumpResponse( $Category->getAllCategories());
}
if (strcmp($_POST["func"] , "getCategoryById") == 0) {
    AppPArent::dumpResponse( $Category->getCategoryById());
}
if (strcmp($_POST["func"] , "updateCategory") == 0) {
    AppPArent::dumpResponse( $Category->updateCategory());
}
if (strcmp($_POST["func"] , "deleteCategory") == 0) {
    AppPArent::dumpResponse( $Category->deleteCategory());
}
if (strcmp($_POST["func"] , "addUnit") == 0) {
    AppPArent::dumpResponse( $Unit->addUnit());
}
if (strcmp($_POST["func"] , "getAllUnit") == 0) {
    AppPArent::dumpResponse( $Unit->getAllUnit());
}
if (strcmp($_POST["func"] , "getUnitById") == 0) {
    AppPArent::dumpResponse( $Unit->getUnitById());
}
if (strcmp($_POST["func"] , "updateUnit") == 0) {
    AppPArent::dumpResponse( $Unit->updateUnit());
}
if (strcmp($_POST["func"] , "deleteUnit") == 0) {
    AppPArent::dumpResponse( $Unit->deleteUnit());
}
if (strcmp($_POST["func"] , "getAllTax") == 0) {
    AppPArent::dumpResponse( $tax->getAllTax());
}
if (strcmp($_POST["func"] , "addTax") == 0) {
    AppPArent::dumpResponse( $tax->addTax());
}
if (strcmp($_POST["func"] , "deleteTax") == 0) {
    AppPArent::dumpResponse( $tax->deleteTax());
}
if (strcmp($_POST["func"] , "getTaxById") == 0) {
    AppPArent::dumpResponse( $tax->getTaxById());
}
if (strcmp($_POST["func"] , "updateTax") == 0) {
    AppPArent::dumpResponse( $tax->updateTax());
}
if (strcmp($_POST["func"] , "getAllWarehouse") == 0) {
    AppPArent::dumpResponse( $warehouse->getAllWarehouse());
}
if (strcmp($_POST["func"] , "addWarehouse") == 0) {
    AppPArent::dumpResponse( $warehouse->addWarehouse());
}
if (strcmp($_POST["func"] , "getWarehouseById") == 0) {
    AppPArent::dumpResponse( $warehouse->getWarehouseById());
}
if (strcmp($_POST["func"] , "updateWarehouse") == 0) {
    AppPArent::dumpResponse( $warehouse->updateWarehouse());
}
if (strcmp($_POST["func"] , "deleteWarehouse") == 0) {
    AppPArent::dumpResponse( $warehouse->deleteWarehouse());
}
