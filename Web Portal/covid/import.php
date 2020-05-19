<?php 
require('includes/config.php');
$csv_file =  'time_series_covid_19_confirmed.csv';
$input = fopen($csv_file, 'a+');
$row = fgetcsv($input, 1024, ","); // here you got the header

/////////////////////////////////////////
$csv_file2 =  'time_series_covid_19_deaths.csv';
$input2 = fopen($csv_file2, 'a+');
$row2 = fgetcsv($input2, 1024, ","); // here you got the header
///////////////////////////////////////////////
$csv_file3 =  'time_series_covid_19_recovered.csv';
$input3 = fopen($csv_file3, 'a+');
$row3 = fgetcsv($input3, 1024, ","); // here you got the header
////////////////////////////////////////////////////////
while ($row = fgetcsv($input, 1024, ",")) 
{
	$row2 = fgetcsv($input2, 1024, ",");
	$row3 = fgetcsv($input3, 1024, ",");
	//echo $row[0].",,,,,,,".$row[1]."<br>";
		$city=$row[0];
		$country=$row[1];
		$lat=$row[2];
		$lng=$row[3];
		$confirmed=''; $deaths=''; $recovered='';
		for($i=4;$i<count($row);$i++)
		{
			$confirmed=$confirmed.$row[$i].",";
			$deaths=$deaths.$row2[$i].",";
			$recovered=$recovered.$row3[$i].",";
			
		}
		$stmt = $conn->prepare("INSERT INTO statistics (`city`, `country`, `lat`, `lng`, `confirmed`, `death`, `recovered`)" 
			." VALUES(?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("sssssss", $city, $country,$lat, $lng,$confirmed,$deaths,$recovered);
		echo $recovered."<br><br><br> ";
		$stmt->execute();
		$stmt->close();
}

?>