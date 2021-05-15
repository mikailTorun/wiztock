<?php

namespace Admin\Controller;
require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';
require_once 'Employee.php';
require_once 'Company.php';
require_once 'Corporate.php';
require_once 'Customer.php';

//use Exception;
//use ArrayObject;
//session_start();
class Individual extends AppParent{

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
        $db = new DatabaseFunc();
        $data= Array(
            "individual_id"=>$this->getIndividualID(),
            "name_surname"=>$this->getNameSurname(),
            "ssn" => $this->getSsn()
        );
        //s($data);die;

        $id = $db->db->insert("individual", $data);
        if(!$id){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   = $db->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return $parent->dumpResponse(($response)); 
        }else{
            return $id;
        }
        
    }

}