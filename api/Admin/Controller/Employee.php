<?php

namespace Admin\Controller;

require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';

class Employee extends DatabaseFunc {

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
        parent::__construct();
    }

    function insertEmployeeFromCustomer(){
        

        $data = array(
            "company_id"   => $this->getCompanyId(),
            "name_surname" => $this->getNameSurname(),
            "email"        => $this->getEmail(),
            "password"     => $this->getPassword(),
            "is_main_user" => $this->getIsMainUser()
        );

        $empid = $this->db->insert ('employee', $data);

        if(!$empid){
            $response['data']=  "" ;
            $response['success']  = false;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return $response;
        }else{
            $response['data']     = $empid ;
            $response['success']  = true;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  = null;
            $response['errCode']  = 0;
            return $response;
        }
    }
}

