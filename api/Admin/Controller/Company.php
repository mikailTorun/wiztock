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
class Company extends DatabaseFunc{

    private $id;
    private $title;
    private $shortName;
    private $phone;
    private $email;
    private $adress;
    private $postalCode;
    private $taxOffice;
    private $taxNumber;

    function setId($id) { $this->id = $id; }
    function getId() { return $this->id; }
    function setTitle($title) { $this->title = $title; }
    function getTitle() { return $this->title; }
    function setShortName($shortName) { $this->shortName = $shortName; }
    function getShortName() { return $this->shortName; }
    function setPhone($phone) { $this->phone = $phone; }
    function getPhone() { return $this->phone; }
    function setEmail($email) { $this->email = $email; }
    function getEmail() { return $this->email; }
    function setAdress($adress) { $this->adress = $adress; }
    function getAdress() { return $this->adress; }
    function setPostalCode($postalCode) { $this->postalCode = $postalCode; }
    function getPostalCode() { return $this->postalCode; }
    function setTaxOffice($taxOffice) { $this->taxOffice = $taxOffice; }
    function getTaxOffice() { return $this->taxOffice; }
    function setTaxNumber($taxNumber) { $this->taxNumber = $taxNumber; }
    function getTaxNumber() { return $this->taxNumber; }


    public function __construct() {
        parent::__construct();
    }
    function addCompany(){
        $post = json_decode($_POST["company"],true);

        
        $this->db->where('email',$post['employees'][0]["email"]);
        $checkAdmin = $this->db->get("employee");
        
        if(count($checkAdmin) !=0 ){
            $response['data']=  "";
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  ="Bu email adresi daha önce sistem kayıt edilmiştir.";
            $response['errCode']  =0;

            return $response;
        } 
        $this->setTitle($post['title']);
        
        $data = Array (
            "title"=> $this->getTitle()
        );
        $id = $this->db->insert ('company', $data);

        if(!$id){
            $response['data']=  "" ;
            $response['success']  = true;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response ;
        }else{

            $this->setId($id);
            
            $employee = new Employee();
            $employee->setCompanyId($this->getId());
            $employee->setNameSurname($post['employees'][0]["name_surname"]);
            $employee->setEmail($post['employees'][0]["email"]);
            $employee->setPassword($post['employees'][0]["password"]);
            $employee->setIsMainUser( 1 );
            
            $empid = $employee->insertEmployeeFromCustomer();
            if(!$empid){
                $response['data']=  "" ;
                $response['success']  =true;
                $response['errMsg']   =null;
                $response['warnMsg']  =$this->db->getLastError();
                $response['errCode']  =0;

                return $response; 
            }else{
                $resData = array('employeeID' =>  $empid, 'companyID' => $this->getId());

                $response['data']=  $resData ;
                $response['success']  =true;
                $response['errMsg']   =null;
                $response['warnMsg']  =null;
                $response['errCode']  =0;
                return $response; 
            }
        }
    }
    function updateCompany(){
        $post = json_decode($_POST["company"],true);
        
        $data = array (
            "title"         =>  $post["title"],
            "short_name"    =>  $post["short_name"],
            "phone"         =>  $post["phone"],
            "email"         =>  $post["email"],
            "address"       =>  $post["address"],
            "postal_code"   =>  $post["postal_code"],
            "tax_office"    =>  $post["tax_office"],
            "tax_number"    =>  $post["tax_number"]
        );
        $this->db->where ('company_id', $post["company_id"]);
        $update =  $this->db->update ('company', $data); 
        if(!$update){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  =$this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $update ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
    }

    function getCompany(){
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $company = $this->db->get("company");

        if(!$company){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $company ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
    }
}
