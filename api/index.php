<?php

$request["data"] ="data";
$request["mess"] = "mess";
$request["code"] = 500;
$request["post"] = $_POST;

echo json_encode($request);