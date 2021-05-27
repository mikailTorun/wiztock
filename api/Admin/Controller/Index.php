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
$login = new DatabaseFunc();
$Customer = new Customer();
$Product  = new Product();
$Category = new Category();
$Unit = new Unit();

if (strcmp($_POST["func"] , "loginFunction") == 0) {
    AppPArent::dumpResponse( $login->login());
}
if (strcmp($_POST["func"] , "funcInsertCustomer") == 0) {
    AppPArent::dumpResponse( $Customer->insertCustomer());
}
if (strcmp($_POST["func"] , "getCustomerList") == 0) {
    AppPArent::dumpResponse( $Customer->getCustomerList());
}
if (strcmp($_POST["func"] , "getCustomer") == 0) {
    AppPArent::dumpResponse( $Customer->getCustomer());
}

if (strcmp($_POST["func"] , "addProduct") == 0) {
    AppPArent::dumpResponse( $Product->addProduct());
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