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
    function addEmployee(){
        $post = json_decode($_POST["employee"],true);
       
        $data = array(
            "company_id"  => $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "name_surname" => $post["name_surname"],
            "email"        => $post["email"],
            "password"     => $post["password"],
            "is_main_user" => $post["is_main_user"]
        );

        $empid = $this->db->insert ('employee', $data);

        if(!$empid){
            $response['data']       =  "" ;
            $response['success']    = false;
            $response['errMsg']     = $this->db->getLastError();
            $response['warnMsg']    = null;
            $response['errCode']    = 0;
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
    function deleteEmployee(){
        $empID = intval($_POST["employee_id"]);
        $this->db->where('employee_id',$empID);
        $this->db->where('is_main_user',0);
        $removed = $this->db->delete("employee");

        if(!$removed){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   = "You cannot remove main user";
            $response['warnMsg']  = $this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $removed ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
    }
    function updateEmployee(){
        $post = json_decode($_POST["employee"],true);
       
        $data = array(
            "name_surname" => $post["name_surname"],
            "email"        => $post["email"],
            "password"     => $post["password"]
        );
        
        $this->db->where("employee_id" , $post["employee_id"]);
        $updated = $this->db->update("employee",$data);
       

        if(!$updated){
            $response['data']       =  "" ;
            $response['success']    = false;
            $response['errMsg']     = $this->db->getLastError();
            $response['warnMsg']    = null;
            $response['errCode']    = 0;
            return $response;
        }else{
            $response['data']     = $updated ;
            $response['success']  = true;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  = null;
            $response['errCode']  = 0;
            return $response;
        }  
    }
    function getAllEmployee(){
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $employee = $this->db->get("employee");

        if(!$employee){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $employee ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
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

