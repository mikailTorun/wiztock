<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';
require_once 'Employee.php';
//use Exception;
//use ArrayObject;
//session_start();

class Index{
    public function __construct() {
        
    }
    public function dumpResponse ($response) {
        ob_clean();
        echo json_encode($response);
        return true;
    }
}

s($_POST);die; 