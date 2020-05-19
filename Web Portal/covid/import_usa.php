<?php 
require('includes/config.php');
$csv_file =  'time_series_covid_19_confirmed_US.csv';
$input = fopen($csv_file, 'a+');
$row = fgetcsv($input, 1024, ","); // here you got the header
while ($row = fgetcsv($input, 1024, ",")) 
{
	//echo $row[0].",,,,,,,".$row[1]."<br>";
		$city=$row[6];
		$lat=$row[8];
		$lng=$row[9];
		$confirmed='';
		for($i=11;$i<count($row);$i++)
		{
			$confirmed=$confirmed.$row[$i].",";
		}
		$stmt = $conn->prepare("INSERT INTO statistics_us (`city`, `lat`, `lng`, `confirmed`)" 
			." VALUES(?, ?, ?, ?)");
		$stmt->bind_param("ssss", $city,$lat, $lng,$confirmed);
		echo $confirmed."<br><br>";
		$stmt->execute();
		$stmt->close();
}

?>