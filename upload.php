<?php 

$tmpfile = $_FILES['file']['tmp_name'];
$filename = basename($_FILES['file']['name']);

$data = array(
    'file' => '@'.$tmpfile.';filename='.$filename,
);

$ch = curl_init();   
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

curl_exec($ch);
 ?>