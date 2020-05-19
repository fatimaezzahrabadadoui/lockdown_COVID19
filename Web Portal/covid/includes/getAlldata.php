<?php
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(E_ALL);
require_once('config.php');
$sql = "SELECT * FROM statistics";
$result = $conn->query($sql);
$confirmed=array(); $deaths=array(); $recovered=array();
if ($result->num_rows > 0)
{
      $i = 0;
      while($row = $result->fetch_assoc()) {
      	  $confirmed[$i]=$row['confirmed'];
      	  $deaths[$i]=$row['death'];
      	  $recovered[$i]=$row['recovered'];
      	  $i++;
      }
     $allConfirmed=0; $allDeath=0; $allRecovered=0;
     for($i=0;$i<count($confirmed);$i++)
      {
      	  $temp=explode(',',$confirmed[$i]);
      	  $allConfirmed=$allConfirmed+(int)$temp[count($temp)-2];
      	  $temp=explode(',',$deaths[$i]);
      	  $allDeath=$allDeath+(int)$temp[count($temp)-2];
      	  $temp=explode(',',$recovered[$i]);
      	  $allRecovered=$allRecovered+(int)$temp[count($temp)-2];
     }
	 $alldata=array();
	 $alldata["confirmed"]=$allConfirmed;
	 $alldata["deaths"]=$allDeath;
	 $alldata["recovred"]=$allRecovered;
	 echo json_encode($alldata);
	 exit();
}
?>