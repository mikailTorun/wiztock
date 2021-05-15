<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';
require_once 'Employee.php';
require_once 'Company.php';
require_once 'Customer.php';
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


