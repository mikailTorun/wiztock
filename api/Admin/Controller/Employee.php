<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';
//use Exception;
//use ArrayObject;
//session_start();
class Employee{
    private $employeeId;
    private $companyId;
    private $nameSurname;
    private $email;
    private $password;
    private $isMainUser;

    function setEmployeeId($employeeId) { $this->employeeId = $employeeId; }
    function getEmployeeId() { return $this->employeeId; }
    function setCompanyId($companyId) { $this->companyId = $companyId; }
    function getCompanyId() { return $this->companyId; }
    function setNameSurname($nameSurname) { $this->nameSurname = $nameSurname; }
    function getNameSurname() { return $this->nameSurname; }
    function setEmail($email) { $this->email = $email; }
    function getEmail() { return $this->email; }
    function setPassword($password) { $this->password = $password; }
    function getPassword() { return $this->password; }
    function setIsMainUser($isMainUser) { $this->isMainUser = $isMainUser; }
    function getIsMainUser() { return $this->isMainUser; }



    public function __construct() {
        
    }
    function dumpResponse ($response) {
        ob_clean();
        echo json_encode($response);
        return true;
    }
    function insertEmployeeFromCustomer(){
        
        $db = new DatabaseFunc();
        $object = new \stdClass();
        
        $object->company_id = $this->getCompanyId();
        $object->name_surname = $this->getNameSurname();
        $object->email = $this->getEmail();
        $object->password = $this->getPassword();
        $object->is_main_user = $this->getIsMainUser();
        $myArray[] = $object;
//        s($myArray[0],$this->getEmail(),json_decode(json_encode($myArray[0]), true));die;
        $empid = $db->db->insert ('employee', json_decode(json_encode($myArray[0]), true));
        return $empid; 
    }
}

//if (isset($_POST['funcInsertCompany'])) {
//    $ajaxTalep = new DatabaseFunc(); 
//    return $ajaxTalep->test();
//}