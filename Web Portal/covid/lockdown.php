<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once('includes/config.php');
require_once "src/KMeans/Space.php";
require_once "src/KMeans/Point.php";
require_once "src/KMeans/Cluster.php";
function getaddress($lat,$lng)
  {
     $url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='.trim($lat).','.trim($lng).'&sensor=false';
     $json = @file_get_contents($url);
     $data=json_decode($json);
     $status = $data->status;
     if($status=="OK")
     {
       return $data->results[0]->formatted_address;
     }
     else
     {
       return false;
     }
  }
function distance($lat1, $lon1, $lat2, $lon2, $unit) {
  if (($lat1 == $lat2) && ($lon1 == $lon2)) {
    return 0;
  }
  else {
    $theta = $lon1 - $lon2;
    $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
    $dist = acos($dist);
    $dist = rad2deg($dist);
    $miles = $dist * 60 * 1.1515;
    $unit = strtoupper($unit);

    if ($unit == "K") {
      return ($miles * 1.609344);
    } else if ($unit == "N") {
      return ($miles * 0.8684);
    } else {
      return $miles;
    }
  }
}

$stmt2 = $conn->prepare("Select track_position.position,users_info.name, users_info.status,track_position.usersID FROM track_position inner join users_info on track_position.usersID=users_info.usersID");     
$stmt2->execute();
$result = $stmt2->get_result();
$lat=array(); $lng=array(); $name=array();
if ($result->num_rows > 0)
{
      $i = 0;
      while($row = $result->fetch_assoc()) 
      {
      	  $temp=explode(':::',$row['position']);
      	  $lat[$i]=$temp[0];
      	  $lng[$i]=$temp[1];
      	  $name[$i]=$row['name'];
      	  $i++;
      }
///////////////////// Find the centroid area via Kmeans Clustering
$points = [];
//////////////////////End of the Kmeans Clustering ////////////////////
      $world="[";
      for($i=0;$i<count($lat);$i++)
      {
      	$world=$world.'[&quot;'.$lat[$i].'&quot;,&quot;'.$lng[$i].'&quot;,&quot;'.$name[$i].'&quot;],';
      	$points[]=[floatval($lat[$i]), floatval($lng[$i])];
      	
      }
      $n =count($lat);
      // create a 2-dimentions space
	  $space = new KMeans\Space(2);
	  // add points to space
	  foreach ($points as $i => $coordinates) 
	  {
		$space->addPoint($coordinates);
	  }
	  
	  $clusters = $space->solve(2, KMeans\Space::SEED_DASV, function () { });
	  $lockdown=array(); $nonlock=array(); $lock=0; $nolock=0;
	  foreach ($clusters as $i => $cluster)
		{
			//printf("Cluster %s [%d,%d]: %d points<br>", $i, $cluster[0], $cluster[1], count($cluster));
			$world=$world.'[&quot;'.$cluster[0].'&quot;,&quot;'.$cluster[1].'&quot;,';
			$frequent_contact=0;
			$j=0;
			$points=array();
			foreach ($cluster as $point)
			{
				$points[$j]=$point;
				$j++;
			}
			for($k=0;$k<count($points)-2;$k++)
			{
				for($h=$k+1;$h<count($points);$h++)
				{
				    if($name[$k]!=$name[$h] )
				    {
    					$distance = distance($points[$k][0], $points[$k][1], $points[$h][0], $points[$h][1], "M");
    					//$distance =$points[$k]->getDistanceWith($points[$h],false);	
    					if(($distance*1609.34)<=5)
    						$frequent_contact++;
				    }
				}
		    }
		    //echo $frequent_contact."<br>";
		    if($frequent_contact>=10)
		    {
		    	$world=$world.'&quot;LockDown Area&quot;],';
		    	$lockdown[$lock]=[$cluster[0],$cluster[1]];	
		    	$lock++;
		    }
		    else
		    {
		    	$world=$world.'&quot;None-LockDown Area&quot;],';
		    	$nonlock[$nolock]=[$cluster[0],$cluster[1]];	
		    	$nolock++;
		    }
		    
		}
      $world=substr($world, 0, -1);
      $world=$world.']';
}

?>
<html>
    <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
       

    <title>Statistics</title>

    <!-- Bootstrap CSS CDN -->
    <link rel="shortcut icon" href="img/logo.png">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
    
    <link rel="stylesheet" href="bootstrap/css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap-reboot.min.css">
    <link rel="stylesheet" href="css/validationEngine.jquery.css" type="text/css"/>
    <!-- Our Custom CSS -->
    <link rel="stylesheet" href="css/ipest.css">
    <link rel="stylesheet" href="css/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/css/font-awesome.css">
    <link href="css/datepicker3.css" rel="stylesheet">
            <!-- Font Awesome  -->
</head>
<body >
<div class="wrapper">
        <!-- Sidebar  -->
<nav id="sidebar">
    <div class="sidebar-header">
        <div><img src="img/logo.png" width="60px"></div>

    </div>

    <ul class="list-unstyled components">
         <li class="">
            <a href="index.php">
                <i class="fa fa-dashboard"></i>
                <div>Home</div>
            </a>

        </li>
        <li class="">
            <a href="statistics.php">
                <i class="fa fa-flag-o"></i>
                <div>Statistics</div>
            </a>

        </li>
       
        <li class="">
            <a href="statistics_usa.php">
                <i class="fa fa-flag-o"></i>
                <div>USA Statistics</div>
            </a>
        </li>
        <li class="">
            <a href="lockdown.php">
                <i class="fa fa-history"></i>
                <div>Lock Down</div>
            </a>
        </li>
   </ul>


</nav>
    <div id="content">
            <nav class="navbar ipest-nav justify-content-end" role="navigation" style="margin-bottom: 40px">
<div class="container-fluid">
    <button type="button" id="sidebarCollapse" class="float-left btn in-fo md-hide">
        <i class="fa fa-align-left"></i>
        <span></span>
    </button>
        <ul class="nav navbar-top-links navbar-right">
             <li class="nav-item dropdown">
                <a class="nav-link user-top" href="javascript:void[0]" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="img/Russell IOT Logo PNG-01.png">
                </a>
                
            </li>
        </ul>
</div>
</nav>
    <div class="main-content">
        <div class="row">
            <div class="col-md-12 cont-wrap">
                <h2>Lockdown Prediction<span><h4> (5 Users have participated by their Android application in two differenr Area)</h4></span></h2>
            </div>
            <div class="row col-md-12 cont-wrap">
                <!-- col 1 -->
                
                <div class="col-md-12">
                    <div class="panel">
                        <div class="panel-body">
                            <div class="row">
                                        <!--col1 -->
                                        <div class="col-md-6">
                                            <p>Lock Down Areas</p>
                                    		<?php
                                    				for($i=0;$i<count($lockdown);$i++)
                                    					echo getaddress($lockdown[$i][0],$lockdown[$i][1])."(".$lockdown[$i][0]."; ".$lockdown[$i][1].")";	
                                    		?>
                                        </div>
                                        <!--col2-->
                                        <div class="col-md-6">
                                            <p>None Lock Down Areas</p>
                                            	<?php
                                    				for($i=0;$i<count($nonlock);$i++)
                                    					echo getaddress($nonlock[$i][0],$nonlock[$i][1])."(".$nonlock[$i][0]."; ".$nonlock[$i][1].")";	
                                    			?>
                                        </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </div>

        <!-- div map -->

        <!-- mapy-->

        <div class="tab-content">
            <div class="row tab-pane  active" id="map" >
                <div class="col-md-12 cont-wrap row">
                    

					<input type="hidden" class="world-map-data" value="<?php echo $world;?>" placeholder="">
                    <!-- Map side -->
                    <div class="col-md-12  map-view">
                        <div class="map">
                            <div id="site-map"></div>
                        </div>

                    </div>

                </div>

            </div>

            
</div>
    </div>
</div>

    <!-- jQuery 3.3.1 version (=with AJAX) -->
<script src="js/jquery-3.3.1.min.js"></script>

<script src="js/languages/jquery.validationEngine-en.js" type="text/javascript" charset="utf-8"></script>
<script src="js/jquery.validationEngine.js" type="text/javascript" charset="utf-8"></script>
<!-- Popper.JS -->
<script src="js/popper.min.js"></script>
<!-- Bootstrap JS -->
<script src="bootstrap/js/bootstrap.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/aes.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

<script src="js/ipest.js"></script>
<script type="text/javascript">
    //var BASE_API_URL="http://localhost:56894";
    var BASE_API_URL = "https://ndoydvhw9i.execute-api.eu-west-2.amazonaws.com/Prod";
    var BASE_URL="http://www.i-pest.net"
            var logged_user_type="1";
    </script>
    
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
    <script src="js/ipestCharts.js"></script>
    <script src='https://maps.google.com/maps/api/js?key=AIzaSyBebNB7vFZ2ubifyxxjfvEHXNGmO8GWAic'>
    </script>
    <script src="js/richmarker.js"></script>
    	 <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
  <link rel="stylesheet" href="/resources/demos/style.css">
  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    	   	<script src="js/bootstrap-datepicker.js"></script>
    <script src="js/lockdown-map.js"></script>
 
    <script type="text/javascript">
        var logged_user_id="aaskslkdlk-ss"
    </script>
    <script type="text/javascript">
        window.localStorage.removeItem("history_activeTab");
    </script>
    <script type="text/javascript">
        window.localStorage.removeItem("home_activeTab");
    </script>


    
        
            
        
    

</body>
</html>
