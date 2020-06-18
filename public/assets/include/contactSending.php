<?php 

	$name = 'mujtaba';//$_POST['name'];
	$email ='muhammad.mujtaba@pitb.gov.pk';// $_POST['email'];
	$mobile = '0322-9033674';//$_POST['mobile'];
	$message = 'testing';//$_POST['message'];
	
	//sending email code
	$to = "mujtabagaints@gmail.com";
	$subject = "French Aesthetics Clinic - User Contact Form Data";
	$userMessage =  "Name: " . $name . "\n\n"  . "Email: " .$email. "\n\n"  . "Mobile #:". $mobile  . "\n\n"  . "Message: " . $message;

	/*$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	$headers .= "From:" . $email;*/

	// To send HTML mail, the Content-type header must be set
	$headers[] = 'MIME-Version: 1.0';
	$headers[] = 'Content-type: text/html; charset=iso-8859-1';

	// Additional headers
	$headers[] = 'From: Birthday Reminder <muhammad.mujtaba@pitb.gov.pk>';

	// Mail it
	$retval = mail($to, $subject, $userMessage, implode("\r\n", $headers));

	//$retval = mail($to,$subject,$userMessage,$headers);

	 if( $retval == true ) {
		echo 1;
	 }else {
		echo 0;
	 }

?>
