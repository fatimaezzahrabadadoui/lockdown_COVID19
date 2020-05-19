<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include('includes/config.php');
//$userid=$_POST['userid'];

$markers = array();
$stmt2 = $conn->prepare("Select track_position.position,users_info.name, users_info.status,track_position.usersID FROM track_position inner join users_info on track_position.usersID=users_info.usersID");     
$stmt2->execute();
$result2 = $stmt2->get_result();
$i=0;
if ($result2->num_rows > 0) 
{
	while ($row2 = $result2->fetch_assoc())
	{
	    $temp=explode(':::',$row2['position']);
		$data= array("lat"=>$temp[0],"lng"=>$temp[1], "status"=>$row2['status'], "name"=>$row2['name']);
        $marker[] = $data;
        $i++;
	}
}
$stmt2->close();
$markers = array("markers"=>$marker);
echo json_encode($markers);
?>