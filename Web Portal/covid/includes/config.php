<?php
ob_start();
session_start();
DEFINE("ROOT_PATH", dirname( __FILE__ ) ."/" );


//set timezone
date_default_timezone_set('Europe/London');

//database credentials
define('DBHOST','localhost');
define('DBUSER','khortech_covid');
define('DBPASS','4d536etxn;hn');
define('DBNAME','khortech_covid19');

//application address
define('DIR','www.byte-erbil.ac/ncc_hr/');
define('SITEEMAIL','noreply@domain.com');


//Create Mysqli connection
$conn = new mysqli(DBHOST, DBUSER, DBPASS, DBNAME);
// Check connection
if($conn->connect_error) {
    die("Connection failed: ".$conn->connect_error);
} 

//echo "Connected successfully";
mysqli_set_charset($conn,"utf8");
?>
