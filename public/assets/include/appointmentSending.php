<?php 

	$name = $_POST['name'];
	$email = $_POST['email'];
	$mobile = $_POST['mobile'];
	$date = $_POST['date'];
	$time = $_POST['time'];
	$option = $_POST['option'];
	
	//sending email code
	$to = "appointment@fa-clinics.com";
	$subject = "French Aesthetics Clinic - User Contact Form Data";
	$userMessage =  "Name: " . $name . "\n\n"  . 
					"Email: " .$email. "\n\n"  . 
					"Mobile #:". $mobile  . "\n\n"  . 
					"Appointment Date: " . $date  . "\n\n"  . 
					"Appointment Time: " . $time  . "\n\n"  . 
					"Appointment For: " . $option;

	$header = "From:" . $email;
	$retval = mail($to,$subject,$userMessage,$header);

	 if( $retval == true ) {
		echo 1;
	 }else {
		echo 0;
	 }

?>
