<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'BaseClass.php';

require_once 'Employee.php';
require_once 'Company.php';
require_once 'Individual.php';
require_once 'Customer.php';

//use Exception;
//use ArrayObject;
//session_start();
class Corporate extends BaseClass{

    public function __construct(){
        parent::__construct();
    }
    private $corporate_id;
    private $title;
    private $short_name;
    private $tax_office;
    private $tax_number;

    function setCorporate_id($corporate_id) { $this->corporate_id = $corporate_id; }
    function getCorporate_id() { return $this->corporate_id; }
    function setTitle($title) { $this->title = $title; }
    function getTitle() { return $this->title; }
    function setShort_name($short_name) { $this->short_name = $short_name; }
    function getShort_name() { return $this->short_name; }
    function setTax_office($tax_office) { $this->tax_office = $tax_office; }
    function getTax_office() { return $this->tax_office; }
    function setTax_number($tax_number) { $this->tax_number = $tax_number; }
    function getTax_number() { return $this->tax_number; }

    function insertCorporate(){

        $data = Array(
            "corporate_id"  => $this->getCorporate_id(),
        	"title"	        => $this->getTitle(),
            "short_name"	=> $this->getShort_name(),
            "tax_office"	=> $this->getTax_office(),
            "tax_number"    => $this->getTax_number()
        );
        $id = $this->db->insert("corporate",$data);
        if(!$id){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $id;
        }
    }
    function updateCorporate(){
        $data= Array(
            //"corporate_id"  => $this->getCorporate_id(),
        	"title"	        => $this->getTitle(),
            "short_name"	=> $this->getShort_name(),
            "tax_office"	=> $this->getTax_office(),
            "tax_number"    => $this->getTax_number()
        );
        
        $this->db->where ('corporate_id', $this->getCorporate_id());
        $id = $this->db->update("corporate", $data);
        if(!$id){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $id;
        } 
    }


}