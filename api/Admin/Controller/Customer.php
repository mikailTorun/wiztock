<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';
require_once 'Employee.php';
require_once 'Company.php';
require_once 'Corporate.php';
require_once 'Individual.php';

use Exception;
use ArrayObject;
//session_start();
class Customer extends AppParent{

    private $customer_id;
    private $company_id;
    private $email;
    private $phone;
    private $adress;
    private $town;
    private $city;
    private $postal_code;
    private $is_corporate;
    private $is_customer;
    private $is_supplier;
    
    function setCustomer_id($customer_id) { $this->customer_id = $customer_id; }
    function getCustomer_id() { return $this->customer_id; }
    function setCompany_id($company_id) { $this->company_id = $company_id; }
    function getCompany_id() { return $this->company_id; }
    function setEmail($email) { $this->email = $email; }
    function getEmail() { return $this->email; }
    function setPhone($phone) { $this->phone = $phone; }
    function getPhone() { return $this->phone; }
    function setAdress($adress) { $this->adress = $adress; }
    function getAdress() { return $this->adress; }
    function setTown($town) { $this->town = $town; }
    function getTown() { return $this->town; }
    function setCity($city) { $this->city = $city; }
    function getCity() { return $this->city; }
    function setPostal_code($postal_code) { $this->postal_code = $postal_code; }
    function getPostal_code() { return $this->postal_code; }
    function setIs_corporate($is_corporate) { $this->is_corporate = $is_corporate; }
    function getIs_corporate() { return $this->is_corporate; }
    function setIs_customer($is_customer) { $this->is_customer = $is_customer; }
    function getIs_customer() { return $this->is_customer; }
    function setIs_supplier($is_supplier) { $this->is_supplier = $is_supplier; }
    function getIs_supplier() { return $this->is_supplier; }
    



    public function __construct() {
        
    }
    
    function getCustomer(){
        $db = new DatabaseFunc();

        $params = array(intval($_POST["customer"]["customer_id"]));

        if(strcmp($_POST["customer"]["is_corporate"] , "1")==0){
            
            $q = "(
                SELECT cp.title, cp.short_name, cp.tax_office,cp.tax_number, c.customer_id, c.email , c.phone ,c.address,c.town,c.city, c.postal_code, c.is_corporate FROM customer c, corporate cp
                    WHERE 
                        c.customer_id=cp.corporate_id  AND c.is_corporate = 1 AND c.is_customer=1 AND c.customer_id=?
                   
            ) ";
           
        }else{
            $q = "(
                
                SELECT i.name_surname, i.ssn, c.customer_id, c.email , c.phone ,c.address,c.town,c.city, c.postal_code, c.is_corporate FROM customer c, individual i
                    WHERE 
                        c.customer_id=i.individual_id  AND c.is_corporate = 0 AND c.is_customer=1 AND c.customer_id=?
            )";
        }

        $results = $db->db->rawQuery ($q,$params);

        if($results){
            $response['data']=  $results ;
            $response['success']  = true;
            $response['errMsg']   = "";
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }else{
            
            $response['data']=  $results ;
            $response['success']  = false;
            $response['errMsg']   = $db->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }
    }
    function getCustomerList(){
        $db = new DatabaseFunc();

        // will handle any SQL query
        $params = Array(10, 1, 10, 11, 2, 10);
        $q = "(
            SELECT cp.title Name, c.customer_id, c.email , c.phone , c.is_corporate FROM customer c, corporate cp
                WHERE 
                    c.customer_id=cp.corporate_id  AND c.is_corporate = 1 AND c.is_customer=1
               
        ) UNION (
            SELECT i.name_surname Name, c.customer_id, c.email , c.phone , c.is_corporate FROM customer c, individual i
                WHERE 
                    c.customer_id=i.individual_id  AND c.is_corporate = 0 AND c.is_customer=1
        )";
        $results = $db->db->rawQuery ($q);
       // s ($results);die; // contains Array of returned rows
        if($results){
            $response['data']=  $results ;
            $response['success']  = true;
            $response['errMsg']   = "";
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }else{
            
            $response['data']=  $results ;
            $response['success']  = false;
            $response['errMsg']   = $db->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }

    }
    function insertCustomer(){

        $db = new DatabaseFunc();

        //$this->setCustomer_id = 0; // insert edildikten sonra girilecek
        $this->setCompany_id ($_SESSION["Admin_Company"]["company"][0]["company_id"]);
       // s($this->getCompany_id());die;
        $this->setEmail ( $_POST["customer_email"]);
        $this->setPhone ( $_POST["customer_phone"]);
        $this->setAdress ( $_POST["customer_address"]);
        $this->setTown ( $_POST["customer_town"]);
        $this->setCity ( $_POST["customer_city"]);
        $this->setPostal_code ( $_POST["customer_postal_code"]);
        $this->setIs_corporate ( intval($_POST["customer_is_corporate"]));
        $this->setIs_customer ( intval($_POST["customer_is_customer"]));
        $this->setIs_supplier ( intval($_POST["customer_is_supplier"]));
        
        $data = Array(
            "company_id" =>  $this->getCompany_id(),
            "email"      => $this->getEmail(),
            "phone"      => $this->getPhone(),
            "address"     => $this->getAdress(),
            "town"       =>	$this->getTown(),
            "city"	     => $this->getCity(),
            "postal_code"=>	$this->getPostal_code(),
            "is_corporate"=>$this->getIs_corporate(),
            "is_customer" => $this->getIs_customer(),
            "is_supplier" => $this->getIs_supplier()
        );

        //s($data, $_POST, $this->getIs_corporate() );die;

        $customer = $db->db->insert ('Customer', $data);

        //s($customer,$db->db->getLastError(),$this);die;
        //$customer=true;
        if(!$customer){
            $response['data']=  "" ;
            $response['success']  = false;
            $response['errMsg']   = $db->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }else{

            $this->setCustomer_id ($customer);

            if ($this->getIs_corporate() == 0) { // bireysel firmaysa
                $individual = new Individual();
                $individual->setIndividualID($this->getCustomer_id());
                $individual->setNameSurname($_POST["individual_name"] ." ".$_POST["individual_surname"]);
                $individual->setSsn($_POST["individual_ssn"]);
                $individualID = $individual->insertIndividualRecord();
                $data["individualID"] = $individual->getIndividualID();
                $data["individual_name_surname"] = $individual->getNameSurname();
                $data["individual_ssn"] = $individual->getSsn();
                $data["customer_id"] = $this->getCustomer_id();

                $response['data']=  $data ;
                $response['success']  = true;
                $response['errMsg']   = null;
                $response['warnMsg']  =null;
                $response['errCode']  =0;
    
                return $response;
               
            }else{
                $corporate = new Corporate();
                $corporate -> setCorporate_id($this->getCustomer_id());
                $corporate -> setTitle($_POST["corporate_title"]);
                $corporate -> setShort_name($_POST["corporate_short_name"]);
                $corporate -> setTax_office($_POST["corporate_tax_office"]);
                $corporate -> setTax_number($_POST["corporate_tax_number"]);

                $corporateID = $corporate->insertCorporate();
                $data["corporate_id"] = $corporate->getCorporate_id();
                $data["getTitle"]     = $corporate->getTitle();
                $data["short_name"]   = $corporate->getShort_name();
                $data["tax_office"]   = $corporate->getTax_office();
                $data["tax_number"]   = $corporate->getTax_number();

                $response['data']    =  $data ;
                $response['success'] =  true;
                $response['errMsg']  =  null;
                $response['warnMsg'] =  null;
                $response['errCode'] =  0;
    
                return $response;

            }
        }
        

    }
}