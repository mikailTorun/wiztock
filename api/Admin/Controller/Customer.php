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
class Customer extends DatabaseFunc{
   

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
        parent::__construct();
    }
    function getAllCustomer(){
        //$db = new DatabaseFunc();

        $q1 = " SELECT * FROM customer c, corporate cp
                WHERE c.customer_id=cp.corporate_id  AND c.is_corporate = 1 AND c.is_customer=1 ";
        $result1 = $this->db->rawQuery ($q1);


        $q2 = "SELECT * FROM customer c, individual i
                WHERE c.customer_id=i.individual_id  AND c.is_corporate = 0 AND c.is_customer=1";
        $result2 = $this->db->rawQuery ($q2);

        
        if($result1 || $result2){
            $response['data']=  array_merge($result1,$result2);
            $response['success']  = true;
            $response['errMsg']   = "";
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }else{
            
            $response['data']=  "" ;
            $response['success']  = false;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }
    }
    function getAllSupplier(){
        //$db = new DatabaseFunc();

        $q1 = " SELECT * FROM customer c, corporate cp
                WHERE c.customer_id=cp.corporate_id  AND c.is_corporate = 1 AND c.is_supplier=1 ";
        $result1 = $this->db->rawQuery ($q1);


        $q2 = "SELECT * FROM customer c, individual i
                WHERE c.customer_id=i.individual_id  AND c.is_corporate = 0 AND c.is_supplier=1";
        $result2 = $this->db->rawQuery ($q2);

        
        if($result1 || $result2){
            $response['data']=  array_merge($result1,$result2);
            $response['success']  = true;
            $response['errMsg']   = "";
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }else{
            
            $response['data']=  "" ;
            $response['success']  = false;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }
    }
    function getCustomer(){
        $db = new DatabaseFunc();

        $params = array(intval($_POST["customer_id"]));

        if(strcmp($_POST["is_corporate"] , "1")==0){
            
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

        $results = $this->db->rawQuery ($q,$params);

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
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }
    }
    function getCustomerList(){
        //$db = new DatabaseFunc();

        // will handle any SQL query
        $params = Array(10, 1, 10, 11, 2, 10);
        $q = "(
            SELECT cp.title name, c.customer_id, c.email , c.phone , c.is_corporate FROM customer c, corporate cp
                WHERE 
                    c.customer_id=cp.corporate_id  AND c.is_corporate = 1 AND c.is_customer=1
               
        ) UNION (
            SELECT i.name_surname name, c.customer_id, c.email , c.phone , c.is_corporate FROM customer c, individual i
                WHERE 
                    c.customer_id=i.individual_id  AND c.is_corporate = 0 AND c.is_customer=1
        )";
        $results = $this->db->rawQuery ($q);
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
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;

            return $response;
        }

    }
    function addCustomer(){

        $post = json_decode($_POST["customer"],true);

        $this->setCompany_id ($_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $this->setEmail ( $post["email"]);
        $this->setPhone ( $post["phone"]);
        $this->setAdress ( $post["address"]);
        $this->setTown ( $post["town"]);
        $this->setCity ( $post["city"]);
        $this->setPostal_code ( $post["postal_code"]);
        $this->setIs_corporate ( intval($post["is_corporate"]));
        $this->setIs_customer ( intval($post["is_customer"]));
        $this->setIs_supplier ( intval($post["is_supplier"]));
        
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

        $customer = $this->db->insert ('Customer', $data);

        if(!$customer){
            $response['data']=  "" ;
            $response['success']  = false;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return $response;
        }else{
            $this->setCustomer_id ($customer);
            if ($this->getIs_corporate() == 0) { // bireysel firmaysa
                $individual = new Individual();
                $individual->setIndividualID($this->getCustomer_id());
                $individual->setNameSurname($post["name_surname"]);
                $individual->setSsn($post["ssn"]);
                $individualID = $individual->insertIndividualRecord();
                $data["individualID"] = $individual->getIndividualID();
                $data["individual_name_surname"] = $individual->getNameSurname();
                $data["individual_ssn"] = $individual->getSsn();
                $data["customer_id"] = $this->getCustomer_id();

                $response['data']       = $data ;
                $response['success']    = true;
                $response['errMsg']     = null;
                $response['warnMsg']    = null;
                $response['errCode']    = 0;
    
                return $response;
             
            }else{
				
                $corporate = new Corporate();
                $corporate -> setCorporate_id($this->getCustomer_id());
                $corporate -> setTitle($post["title"]);
                $corporate -> setShort_name($post["short_name"]);
                $corporate -> setTax_office($post["tax_office"]);
                $corporate -> setTax_number($post["tax_number"]);

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
    function updateCustomer(){

        $post = json_decode($_POST["customer"],true);

        $this->setCompany_id ($_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $this->setCustomer_id ($post["customer_id"]);
        $this->setEmail ( $post["email"]);
        $this->setPhone ( $post["phone"]);
        $this->setAdress ( $post["address"]);
        $this->setTown ( $post["town"]);
        $this->setCity ( $post["city"]);
        $this->setPostal_code ( $post["postal_code"]);
        $this->setIs_corporate ( intval($post["is_corporate"]));
        $this->setIs_customer ( intval($post["is_customer"]));
        $this->setIs_supplier ( intval($post["is_supplier"]));
        //s($post);die;
        $data = array (
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
        $this->db->where ('customer_id', $post["customer_id"]);
        $update =  $this->db->update ('customer', $data); 
        if(!$update){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  =$this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            
            if ($this->getIs_corporate() == 0) { // bireysel firmaysa
                $individual = new Individual();
                $individual->setIndividualID($this->getCustomer_id());
                $individual->setNameSurname($post["name_surname"]);
                $individual->setSsn($post["ssn"]);
                $individualID = $individual->updateIndividualRecord();
                $data["individualID"] = $individual->getIndividualID();
                $data["individual_name_surname"] = $individual->getNameSurname();
                $data["individual_ssn"] = $individual->getSsn();
                $data["customer_id"] = $this->getCustomer_id();

                $response['data']       = $data ;
                $response['success']    = true;
                $response['errMsg']     = null;
                $response['warnMsg']    = null;
                $response['errCode']    = 0;
    
                return $response;
            }else{
				
                $corporate = new Corporate();
                $corporate -> setCorporate_id($this->getCustomer_id());
                $corporate -> setTitle($post["title"]);
                $corporate -> setShort_name($post["short_name"]);
                $corporate -> setTax_office($post["tax_office"]);
                $corporate -> setTax_number($post["tax_number"]);

                $corporateID = $corporate->updateCorporate();
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