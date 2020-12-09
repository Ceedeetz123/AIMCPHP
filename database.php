<?php

if(!isset($error)){
  $error = new stdClass();
}
//Data Connections
include "dbinfo.inc.php"; //Data Connection file called

try {
  $pdo = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $password, [PDO:: ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]); //Data Strings
} catch (PDOexception $e) { //if there is no/invalid data string
  $error->code = "error"; 
  $error->message = $e->getMessage(); 
  echo json_encode($error);
  $pdo = null;
  return;
}
//Gets Tables
$tables = array();
$result = $pdo->query("SHOW TABLES");//SQL query to get all tables from database
while ($row = $result->fetch(PDO::FETCH_NUM)){ //fetches index and value from query
  $tables[] = $row[0]; //each row will be added to its own index in the array
}

echo json_encode($tables); //all tables will be displayed in JSON form
$pdo = null;
?>
