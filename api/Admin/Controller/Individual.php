<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'BaseClass.php';

require_once 'Employee.php';
require_once 'Company.php';
require_once 'Corporate.php';
require_once 'Customer.php';

//use Exception;
//use ArrayObject;
//session_start();
class Individual extends BaseClass{

    public function __construct() {
        parent::__construct();
    }

    private $individualID;
    private $nameSurname;
    private $ssn;
    
    function setIndividualID($individualID) { $this->individualID = $individualID; }
    function getIndividualID() { return $this->individualID; }
    function setNameSurname($nameSurname) { $this->nameSurname = $nameSurname; }
    function getNameSurname() { return $this->nameSurname; }
    function setSsn($ssn) { $this->ssn = $ssn; }
    function getSsn() { return $this->ssn; }
    

    function insertIndividualRecord(){
      
        $data= Array(
            "individual_id"=>$this->getIndividualID(),
            "name_surname"=>$this->getNameSurname(),
            "ssn" => $this->getSsn()
        );
        

        $id = $this->db->insert("individual", $data);
        if(!$id){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $id;
        }
        
    }
    function updateIndividualRecord(){
        $data= Array(
            //"individual_id"=>$this->getIndividualID(),
            "name_surname"=>$this->getNameSurname(),
            "ssn" => $this->getSsn()
        );
        
        $this->db->where ('individual_id', $this->getIndividualID());
        $id = $this->db->update("individual", $data);
        if(!$id){
            return $this->response( "" , false, $this->db->getLastError()  );
        }else{
            return $id;
        } 
    }

}