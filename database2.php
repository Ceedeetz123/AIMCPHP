<?php
if (!isset($error)) {
	$error = new stdClass();
}
//Data Connections
include "dbinfo.inc.php";

try {
	///$dbh = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password);
	$pdo = new PDO("mysql:host=$host;dbname=$database;charset=utf8", $username, $password, [PDO:: ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_EMULATE_PREPARES => false]);

	// check database connection
} catch (PDOException $e) {
	$error->code = "error";
	$error->message = "There was a problem connecting to the database";
	echo json_encode($error);
	$pdo = null;
	return;
}

$table = $_GET["tableName"]; //get table name
$appendData = $_GET['appendData']; //get column name as property and input values as value
$json_array = json_decode($appendData, true); //converts object into PHP object

$query = "INSERT INTO ".$table." ("; //start of sql query 
$placeholder = ""; 
$values = array();

foreach($json_array as $key => $value) { //json_array array split into property($key) and value($value) from foreach 
	 $query .= $key.", "; //property will be used to set column name
	 $placeholder .= "?, "; //parameters for each object row
	 $values[] = $value; //Everytime a column name is set, the value for that column will be placed in a array
}

$query = rtrim($query, ', '); 
$placeholder = rtrim($placeholder, ', '); 
$query .= ") VALUES (".$placeholder.")";  //? establishes the placeholder

$stmt = $pdo->prepare($query); //prepared statement used against sql injections

$counter = 1;
foreach ($json_array as $key => &$val) {  
	 $stmt->bindParam($counter, $val); //values inputted into query
	 $counter++;
}

$stmt->execute(); //executes query

echo $pdo->lastInsertId();
$stmt = null;
$pdo = null;
?>