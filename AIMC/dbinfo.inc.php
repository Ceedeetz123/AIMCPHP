<?php
$servername="localhost";
$username="17144159";
$password="frRDnyBYXLQ7";
$database="db_17144159";

 $conn=mysqli_connect($servername,$username,$password,$database);
      if(!$conn){
          die('Could not Connect MySql Server:' .mysql_error());
        }
?>
