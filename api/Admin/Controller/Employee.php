<?php

namespace Admin\Controller;

require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'BaseClass.php';

class Employee extends BaseClass {

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


/*
    public function __get($name)
    {
        return $this->$name;
    }

    public function __set($name, $value)
    {
        $this->$name = htmlspecialchars(strip_tags($value));
    }
*/

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
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $empid, true );
        }
    }
    function deleteEmployee(){
        $empID = intval($_POST["employee_id"]);
        $this->db->where('employee_id',$empID);
        $this->db->where('is_main_user',0);
        $removed = $this->db->delete("employee");

        if(!$removed){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $removed,true);
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
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $updated , true  );
        }  
    }
    function login(){
        $this->db->where('email',$_POST['username']);
        $this->db->where('password',$_POST['password']);
        $checkAdmin = $this->db->get("employee");
        //s(count($checkAdmin) ==0);die;
        if(count($checkAdmin) ==0 ){
           return $this->response( "" , false, "Kullanıcı kayıtlı değil"  );
        } 
        $this->db->where('company_id',$checkAdmin[0]['company_id']);
        $company = $this->db->get("company");
        if (count($company) == 0) {
            return $this->response( "" , false, $this->db->getLastError()  );
        }
        $response = Array( "success" => true,"admin" => $checkAdmin, "company" => $company , "forwardLink"=>"http://localhost/wiztock/#!/Dashboard");
        $_SESSION["Admin_Company"] = $response;
        
        return $this->response( $response , true);
    }
    function getAllEmployee(){
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $employee = $this->db->get("employee");

        if(!$employee){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $employee, true  );
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
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $this->response( $empid, true  );
        }
    }
}

