<?php
$to      = 'ahmedmilhem@gmail.com';
$subject = 'Yalla Pal Coming Soon Page: Inquiry';
$message = $_POST['message'];

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

$headers .= 'From: '. $_POST['email'] . "\r\n" .
    'Reply-To: ahmedmilhem@gmail.com' . "\r\n"; 
//echo $headers;
$retval = mail($to, $subject, $message, $headers);
if($retval){
	echo 1;
}else{
	echo 0;
}
?> 
