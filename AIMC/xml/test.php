<?php
  ini_set('display_errors',1); 
  error_reporting(E_ALL);

  $myfile = fopen("newtest.txt", "w") or die("Unable to open file");
  $txt = "John Doe\n";
  fwrite($myfile, $txt);
  $txt = "Jane Doe\n";
  fwrite($myfile, $txt);
  fclose($myfile);

  return;
?>