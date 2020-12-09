<?php

//remote
$servername="remotemysql.com";
$username="M8uTLrwG2w";
$password="0OWnCI51Xo";
$database="M8uTLrwG2w";

/* //local
$servername="localhost";
$username="root";
$password="";
$database="test";  */


 $conn=mysqli_connect($servername,$username,$password,$database);
      if(!$conn){
          die('Could not Connect MySql Server:' .mysql_error());
        }

		
?>
