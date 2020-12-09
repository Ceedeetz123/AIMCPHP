<?php

if (!isset($error)) {
	$error = new stdClass();
}
//Establishing Data connection 
include "dbinfo.inc.php";

try {
$pdo = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $password, [PDO:: ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]);
} catch (PDOException $e) {
	$error->code = "error";
	$error->message = "There was a problem connecting to the database";
	echo json_encode($error);
	$pdo = null;
	return;
}

$table = $_GET["tableName"]; //Get table name from getJSON function

$stmt = $pdo->prepare("SELECT * FROM {$table}"); //SQL sting to get all records in a selected table
$result = $stmt->execute();

if ($stmt->rowCount() > 0) //if there is rows
  {
	  $tableData = array(); 
	  $tableData[] = $stmt->fetchAll(PDO::FETCH_ASSOC); //add each row in the table in the array
	  echo json_encode($tableData); 
	}
	else //no rows
	{
	  $error->code = "error"; 
	  $error->message = "The table: ".$table." contains no rows.";
	  echo json_encode($error); //output error message
	}
	//clear variables 
	$stmt = null; 
	$pdo = null;
?>