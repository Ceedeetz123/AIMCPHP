<?php

$directory = 'xml'; 

if (!chdir($directory)){  //check if there is no folder for the xml file
  $error->code = "error";
  $error->message = "The directory cannot be found";
  echo json_encode($error);
  return;
}

$files = glob("*.xml");

if (empty($files)){ //check if there is no xml in the folder
  $error->code ="error";
  $error->message = "no files";
  echo json_encode($error);
  return;
}

$output = array();
foreach($files as $filename){ 
  array_push($output, pathinfo($filename, PATHINFO_FILENAME));
}

echo json_encode($output);

?>
