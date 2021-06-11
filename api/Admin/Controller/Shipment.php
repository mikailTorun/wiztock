<?php

namespace Admin\Controller;
//require_once '../../DB/MysqliDb.php';
require_once '../../vendor/autoload.php';
require_once 'DatabaseFunc.php';
require_once 'AppParent.php';

use Exception;
use ArrayObject;
//session_start();
class Shipment extends DatabaseFunc{
    
    public function __construct() {
        parent::__construct();
    }
    function getAllShipmentType(){
        $shipmentType = $this->db->get("shipment_type");
        
        if(!$shipmentType){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $shipmentType ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
	}
    
    function addShipment(){
        $post = json_decode($_POST["shipment"],true);

        //$input = '06/10/2011 19:00:02';
        $issue_date = strtotime($post["issue_date"]);
        $shipment_date = strtotime($post["shipment_date"]);
        
        //s( $issue_date, $post, $post["shipment_items"][0] , date('d/M/Y h:i:s', $date)); die;
        $data = array(
            //"shipment_id"               =>	
            "company_id"	            =>  $_SESSION["Admin_Company"]["company"][0]["company_id"],
            "shipment_type_id"          =>	$post["shipment_type_id"],
            "freight_bill_number"       =>	$post["freight_bill_number"],
            "source_warehouse_id"       =>	intval($post["source_warehouse_id"]) == 0 ? null : intval($post["source_warehouse_id"]) ,
            "destination_warehouse_id"  =>	intval($post["destination_warehouse_id"]) == 0 ? null : intval($post["destination_warehouse_id"])  ,
            "customer_id"	            =>  intval($post["customer_id"]),
            "issue_date"	            =>  date('Y-m-d', $issue_date),
            "shipment_date"             =>  date('Y-m-d', $shipment_date)
        );

        $shipment = $this->db->insert ('shipment', $data);

        if(!$shipment){
            $response['data']=  "" ;
            $response['success']  = false;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return $response;
        }else{


            for($i=0 ; $i < count($post["shipment_items"]) ; $i++){

                $data = array(
                    "product_id"   =>   $post["shipment_items"][$i]["product"]["product_id"],
                    "shipment_id"  =>   $shipment,
                    "amount"       =>	intval($post["shipment_items"][$i]["amount"])
                );
        
                $shipment_detail = $this->db->insert ('shipment_detail', $data);
                if(!$shipment_detail){
                    $response['data']       =  "" ;
                    $response['success']    = false;
                    $response['errMsg']     = $this->db->getLastError();
                    $response['warnMsg']    = null;
                    $response['errCode']    = 0;
                    return $response;
                }else{   

                    if( intval( $post["shipment_type_id"] ) ==  1){// tallyIN

                        $this->db->where("product_id" ,  intval($post["shipment_items"][$i]["product"]["product_id"]) );
                        $this->db->where("warehouse_id" ,intval($post["destination_warehouse_id"]) );
                        $prdctDB = $this->db->get("product_warehouse");

                        if(count($prdctDB) < 1){
                            $data = array(  
                                	
                                "warehouse_id" =>intval($post["destination_warehouse_id"]),
                                "product_id"    => intval($post["shipment_items"][$i]["product"]["product_id"]),
                                "quantity_in_stock" =>  floatval($post["shipment_items"][$i]["amount"])
                            );

                            $insert = $this->db->insert("product_warehouse" , $data);
                            if(!$insert){
                                $response['data']=  "" ;
                                $response['success']  = false;
                                $response['errMsg']   = $this->db->getLastError();
                                $response['warnMsg']  =null;
                                $response['errCode']  =0;
                                return $response;
                            }
                        }



                        $data = array(  
                            "quantity_in_stock"     =>  $prdctDB[0]["quantity_in_stock"] + floatval($post["shipment_items"][$i]["amount"])
                        );

                        $this->db->where ('product_id', intval($post["shipment_items"][$i]["product"]["product_id"]));
                        $this->db->where("warehouse_id" ,intval($post["destination_warehouse_id"]) );
                        $updateAmount = $this->db->update ('product_warehouse', $data);
                        if (!$updateAmount){
                            $response['data']=  "" ;
                            $response['success']  = false;
                            $response['errMsg']   = $this->db->getLastError();
                            $response['warnMsg']  =null;
                            $response['errCode']  =0;
                            return $response;
                        }else{

                        }
                    }else if(intval($post["shipment_type_id"])  ==  2 ){ // tallyOUT
                        $this->db->where("product_id" ,  intval($post["shipment_items"][$i]["product"]["product_id"]) );
                        $this->db->where("warehouse_id" ,intval($post["source_warehouse_id"]) );
                        $prdctDB = $this->db->get("product_warehouse");

                        $data = array(  
                            "quantity_in_stock"     =>  $prdctDB[0]["quantity_in_stock"] - intfloat($post["shipment_items"][$i]["amount"])
                        );

                        $this->db->where ('product_id', intval($post["shipment_items"][$i]["product"]["product_id"]));
                        $updateAmount = $this->db->update ('product_warehouse', $data);
                        if (!$updateAmount){
                            $response['data']=  "" ;
                            $response['success']  = false;
                            $response['errMsg']   = $this->db->getLastError();
                            $response['warnMsg']  =null;
                            $response['errCode']  =0;
                            return $response;
                        }else{
                            
                        }
                    }else if(intval($post["shipment_type_id"])  ==  3){ //// tally - both of them

                        $this->db->where("product_id" ,  intval($post["shipment_items"][$i]["product"]["product_id"]) );
                        $this->db->where("warehouse_id" ,intval($post["destination_warehouse_id"]) );
                        $prdctDB = $this->db->get("product_warehouse");


                        $data = array(  
                            "quantity_in_stock"     =>  $prdctDB[0]["quantity_in_stock"] + intfloat($post["shipment_items"][$i]["amount"])
                        );

                        $this->db->where ('product_id', intval($post["shipment_items"][$i]["product"]["product_id"]));
                        $updateAmount = $this->db->update ('product_warehouse', $data);
                        if (!$updateAmount){
                            $response['data']=  "" ;
                            $response['success']  = false;
                            $response['errMsg']   = $this->db->getLastError();
                            $response['warnMsg']  =null;
                            $response['errCode']  =0;
                            return $response;
                        }
                        $this->db->where("product_id" ,  intval($post["shipment_items"][$i]["product"]["product_id"]) );
                        $this->db->where("warehouse_id" ,intval($post["source_warehouse_id"]) );
                        $prdctDB = $this->db->get("product_warehouse");

                        $data = array(  
                            "quantity_in_stock"     =>  $prdctDB[0]["quantity_in_stock"] - intfloat($post["shipment_items"][$i]["amount"])
                        );

                        $this->db->where ('product_id', intval($post["shipment_items"][$i]["product"]["product_id"]));
                        $updateAmount = $this->db->update ('product_warehouse', $data);
                        if (!$updateAmount){
                            $response['data']=  "" ;
                            $response['success']  = false;
                            $response['errMsg']   = $this->db->getLastError();
                            $response['warnMsg']  =null;
                            $response['errCode']  =0;
                            return $response;
                        }
                    } 
                }
            
            }



            $response['data']     = "" ;
            $response['success']  = true;
            $response['errMsg']   = $this->db->getLastError();
            $response['warnMsg']  = null;
            $response['errCode']  = 0;
            return $response;
        }
    }
    function getAllShipment(){
        $this->db->where('company_id',$_SESSION["Admin_Company"]["company"][0]["company_id"]);
        $shipment = $this->db->get("shipment");

        if(!$shipment){
            $response['data']=  "" ;
            $response['success']  =false;
            $response['errMsg']   =null;
            $response['warnMsg']  = $this->db->getLastError();
            $response['errCode']  =0;

            return (($response)); 
        }else{
           
            $response['data']=  $shipment ;
            $response['success']  =true;
            $response['errMsg']   =null;
            $response['warnMsg']  =null;
            $response['errCode']  =0;
            return (($response)); 
        }
    }
}