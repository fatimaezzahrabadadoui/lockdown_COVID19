package system.khortech.covid19_lockdown;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;

import android.Manifest;
import android.app.AlarmManager;
import android.app.AlertDialog;
import android.app.Notification;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.location.Location;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.SystemClock;
import android.provider.Settings;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GoogleApiAvailability;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.material.snackbar.Snackbar;
import com.google.maps.android.clustering.ClusterManager;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static java.lang.System.exit;

public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {
    protected BroadcastReceiver mMessageReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, final Intent intent) {
            String latitude = intent.getStringExtra(MyService.EXTRA_LATITUDE);
            String longitude = intent.getStringExtra(MyService.EXTRA_LONGITUDE);

            if (latitude != null && longitude != null) {
                //halo mMsgView.setText(getString(R.string.msg_location_service_started) + "\n Latitude : " + latitude + "\n Longitude: " + longitude);
                //Toast.makeText(getApplicationContext(),"Hi :"+"Latitude : " + latitude + " Longitude: " + longitude,Toast.LENGTH_LONG).show();
                Log.i("kaka","Hi :"+"Latitude : " + latitude + " Longitude: " + longitude);
                Location myLocation=new Location("");
                myLocation.setLatitude(new Double(latitude));
                myLocation.setLongitude(new Double(longitude));
                double distanceInMeters=0.0;
                for(int i=0;i<AllLocations.size();i++) {
                    distanceInMeters = AllLocations.get(i).distanceTo(myLocation);
                    if(distanceInMeters<=5) {
                        // Toast.makeText(getApplicationContext(), "You are approached coivd19 cases", Toast.LENGTH_LONG).show();
                        scheduleNotification(getNotification( "You are approaching to infected users" ) , 500 ) ;
                        break;
                    }
                }

                MapsActivity.sendToServer(new LatLng(new Double(latitude),new Double(longitude)));
            }

        }
    };
    private static GoogleMap mMap;
    private boolean mAlreadyStartedService = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        AllLocations=new ArrayList <Location>();
       /* if (!checkPermission(Manifest.permission.ACCESS_FINE_LOCATION))
        {
            requestPermissions(Manifest.permission.ACCESS_FINE_LOCATION);

        }
        if (!checkPermission(Manifest.permission.ACCESS_COARSE_LOCATION))
        {
            requestPermissions(Manifest.permission.ACCESS_FINE_LOCATION);

        }
        if (!checkPermission(Manifest.permission.ACCESS_BACKGROUND_LOCATION))
        {
            requestPermissions(Manifest.permission.ACCESS_BACKGROUND_LOCATION);

        }*/
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

    }
    @Override
    public void onMapReady(GoogleMap googleMap) {

        mMap = googleMap;
        // Enabling MyLocation button for the Google Map


        // Setting OnClickEvent listener for the GoogleMap
        mMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {
            @Override
            public void onMapClick(LatLng latlng) {
                addMarker(latlng, MainActivity.cuser.getstatus(),"");
                Location myLocation=new Location("");
                myLocation.setLatitude(latlng.latitude);
                myLocation.setLongitude(latlng.longitude);
                double distanceInMeters=0.0;
                for(int i=0;i<AllLocations.size();i++) {
                    distanceInMeters = AllLocations.get(i).distanceTo(myLocation);
                    if(distanceInMeters<=15) {
                       // Toast.makeText(getApplicationContext(), "You are approached coivd19 cases", Toast.LENGTH_LONG).show();
                        new COVID19Dialog().show(getSupportFragmentManager(),"about");
                        break;
                    }
                }
                sendToServer(latlng);
            }
        });

        // Starting locations retrieve task
        new RetrieveTask().execute();
        //mClusterManager = new ClusterManager<MyItem>(this, mMap);
        //mMap.setOnCameraIdleListener(mClusterManager);
        //mMap.setOnMarkerClickListener(mClusterManager);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(new LatLng(39.748159,-104.99005), 18));  //move camera to location

        startStep1();
    }

    // Adding marker on the GoogleMaps
    public static void addMarker(LatLng latlng, String Status, String name) {
        MarkerOptions markerOptions = new MarkerOptions();
        markerOptions.position(latlng);
        markerOptions.title(latlng.latitude + "," + latlng.longitude);
        if(name.equals("A"))
            markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_YELLOW));
        else if(name.equals("B"))
            markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_GREEN));
        else if(name.equals("C"))
            markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_BLUE));
        else if(name.equals("D"))
            markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_ORANGE));
        else if(name.equals("E"))
            markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_ROSE));
        else
            markerOptions.icon(BitmapDescriptorFactory.defaultMarker(BitmapDescriptorFactory.HUE_RED));

        mMap.addMarker(markerOptions);
    }

    // Invoking background thread to store the touched location in Remove MySQL server
    public static void sendToServer(LatLng latlng) {
        new SaveTask().execute(latlng);
    }
    // Background thread to save the location in remove MySQL server
    private static class SaveTask extends AsyncTask<LatLng, Void, Void> {
        @Override
        protected Void doInBackground(LatLng... params) {
            String userID=MainActivity.cuser.getId();
            String lat = Double.toString(params[0].latitude);
            String lng = Double.toString(params[0].longitude);
            String strUrl = "https://khortech.com/covid/save.php";
            URL url = null;
            try {
                url = new URL(strUrl);

                HttpURLConnection connection = (HttpURLConnection) url
                        .openConnection();
                connection.setRequestMethod("POST");
                connection.setDoOutput(true);
                OutputStreamWriter outputStreamWriter = new OutputStreamWriter(
                        connection.getOutputStream());

                outputStreamWriter.write("lat=" + lat + "&lng="+lng+"&userid="+userID);
                outputStreamWriter.flush();
                outputStreamWriter.close();

                InputStream iStream = connection.getInputStream();
                BufferedReader reader = new BufferedReader(new
                        InputStreamReader(iStream));

                StringBuffer sb = new StringBuffer();

                String line = "";

                while( (line = reader.readLine()) != null){
                    sb.append(line);
                }
                //Toast.makeText(MapsActivity.this,"kaka"+sb,Toast.LENGTH_LONG).show();
                reader.close();
                iStream.close();

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return null;
        }
    }
    // Background task to retrieve locations from remote mysql server
    private class RetrieveTask extends AsyncTask <Void, Void, String> {

        @Override
        protected String doInBackground(Void... params) {
            String strUrl = "https://khortech.com/covid/retrieve.php";
            URL url = null;
            StringBuffer sb = new StringBuffer();
            try {
                url = new URL(strUrl);
                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.connect();
                InputStream iStream = connection.getInputStream();
                BufferedReader reader = new BufferedReader(new InputStreamReader(iStream));
                String line = "";
                while( (line = reader.readLine()) != null){
                    sb.append(line);
                }

                reader.close();
                iStream.close();

            } catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return sb.toString();
        }

        @Override
        protected void onPostExecute(String result) {
            super.onPostExecute(result);
            new ParserTask().execute(result);
        }
    }
    // Background thread to parse the JSON data retrieved from MySQL server
    private class ParserTask extends AsyncTask<String, Void, List<HashMap <String, String>>>{
        @Override
        protected List <HashMap<String,String>> doInBackground(String... params) {
            MarkerJSONParser markerParser = new MarkerJSONParser();
            JSONObject json = null;
            try {
                json = new JSONObject(params[0]);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            List<HashMap<String, String>> markersList = markerParser.parse(json);
            return markersList;
        }

        @Override
        protected void onPostExecute(List<HashMap<String, String>> result) {
            for(int i=0; i<result.size();i++){
                HashMap<String, String> marker = result.get(i);
                LatLng latlng = new LatLng(Double.parseDouble(marker.get("lat")), Double.parseDouble(marker.get("lng")));
                Location ob=new Location("");
                ob.setLatitude(latlng.latitude);
                ob.setLongitude(latlng.longitude);
                AllLocations.add(ob);
                addMarker(latlng,marker.get("status"),marker.get("name"));
            }
        }
    }
    ArrayList<Location> AllLocations;
    // Declare a variable for the cluster manager.
    //private static ClusterManager <MyItem> mClusterManager;
    @Override
    public void onResume() {
        super.onResume();
        LocalBroadcastManager.getInstance(this.getApplicationContext()).registerReceiver(mMessageReceiver,
                new IntentFilter(MyService.ACTION_LOCATION_BROADCAST));
    }


    /**
     * Step 1: Check Google Play services
     */
    private void startStep1() {

        //Check whether this user has installed Google play service which is being used by Location updates.
        if (isGooglePlayServicesAvailable()) {

            //Passing null to indicate that it is executing for the first time.
            Log.i("kaka","GOOGLE API is HERE");
            startStep2(null);

        } else {
            Toast.makeText(getApplicationContext(), R.string.no_google_playservice_available, Toast.LENGTH_LONG).show();
        }
    }


    /**
     * Step 2: Check & Prompt Internet connection
     */
    private Boolean startStep2(DialogInterface dialog) {
        ConnectivityManager connectivityManager
                = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();

        if (activeNetworkInfo == null || !activeNetworkInfo.isConnected()) {
            promptInternetConnect();
            return false;
        }


        if (dialog != null) {
            dialog.dismiss();
        }

        //Yes there is active internet connection. Next check Location is granted by user or not.

        if (checkPermissions()) { //Yes permissions are granted by the user. Go to the next step.
            mMap.setMyLocationEnabled(true);
            startStep3();
        } else {  //No user has not granted the permissions yet. Request now.
            requestPermissions();
        }
        return true;
    }

    /**
     * Show A Dialog with button to refresh the internet state.
     */
    private void promptInternetConnect() {
        AlertDialog.Builder builder = new AlertDialog.Builder(MapsActivity.this);
        builder.setTitle(R.string.title_alert_no_intenet);
        builder.setMessage(R.string.msg_alert_no_internet);

        String positiveText = getString(R.string.btn_label_refresh);
        builder.setPositiveButton(positiveText,
                new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {


                        //Block the Application Execution until user grants the permissions
                        if (startStep2(dialog)) {

                            //Now make sure about location permission.
                            if (checkPermissions()) {

                                //Step 2: Start the Location Monitor Service
                                //Everything is there to start the service.
                                startStep3();
                            } else if (!checkPermissions()) {
                                requestPermissions();
                            }

                        }
                    }
                });

        AlertDialog dialog = builder.create();
        dialog.show();
    }

    /**
     * Step 3: Start the Location Monitor Service
     */
    private void startStep3() {

        //And it will be keep running until you close the entire application from task manager.
        //This method will executed only once.

        if (!mAlreadyStartedService) {


            //Start location sharing service to app server.........
            Intent intent = new Intent(this, MyService.class);
            startService(intent);

            mAlreadyStartedService = true;
            //Ends................................................
        }
    }

    /**
     * Return the availability of GooglePlayServices
     */
    public boolean isGooglePlayServicesAvailable() {
        GoogleApiAvailability googleApiAvailability = GoogleApiAvailability.getInstance();
        int status = googleApiAvailability.isGooglePlayServicesAvailable(this);
        if (status != ConnectionResult.SUCCESS) {
            if (googleApiAvailability.isUserResolvableError(status)) {
                googleApiAvailability.getErrorDialog(this, status, 2404).show();
            }
            return false;
        }
        return true;
    }
    private static final int REQUEST_PERMISSIONS_REQUEST_CODE = 34;


    /**
     * Return the current state of the permissions needed.
     */
    private boolean checkPermissions() {
        int permissionState1 = ActivityCompat.checkSelfPermission(this,
                android.Manifest.permission.ACCESS_FINE_LOCATION);

        int permissionState2 = ActivityCompat.checkSelfPermission(this,
                Manifest.permission.ACCESS_COARSE_LOCATION);

        return permissionState1 == PackageManager.PERMISSION_GRANTED && permissionState2 == PackageManager.PERMISSION_GRANTED;

    }

    /**
     * Start permissions requests.
     */
    private void requestPermissions() {

        boolean shouldProvideRationale =
                ActivityCompat.shouldShowRequestPermissionRationale(this,
                        android.Manifest.permission.ACCESS_FINE_LOCATION);

        boolean shouldProvideRationale2 =
                ActivityCompat.shouldShowRequestPermissionRationale(this,
                        Manifest.permission.ACCESS_COARSE_LOCATION);


        // Provide an additional rationale to the img_user. This would happen if the img_user denied the
        // request previously, but didn't check the "Don't ask again" checkbox.
        if (shouldProvideRationale || shouldProvideRationale2) {
            Log.i("COVID19", "Displaying permission rationale to provide additional context.");
            showSnackbar(R.string.permission_rationale,
                    android.R.string.ok, new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            // Request permission
                            ActivityCompat.requestPermissions(MapsActivity.this,
                                    new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION},
                                    REQUEST_PERMISSIONS_REQUEST_CODE);
                        }
                    });
        } else {
            Log.i("COVID19", "Requesting permission");
            // Request permission. It's possible this can be auto answered if device policy
            // sets the permission in a given state or the img_user denied the permission
            // previously and checked "Never ask again".
            ActivityCompat.requestPermissions(MapsActivity.this,
                    new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION},
                    REQUEST_PERMISSIONS_REQUEST_CODE);
        }
    }



    private void showSnackbar(final int mainTextStringId, final int actionStringId,
                              View.OnClickListener listener) {
        Snackbar.make(
                findViewById(android.R.id.content),
                getString(mainTextStringId),
                Snackbar.LENGTH_INDEFINITE)
                .setAction(getString(actionStringId), listener).show();
    }

    /**
     * Callback received when a permissions request has been completed.
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        Log.i("COVID19", "onRequestPermissionResult");
        if (requestCode == REQUEST_PERMISSIONS_REQUEST_CODE) {
            if (grantResults.length <= 0) {
                // If img_user interaction was interrupted, the permission request is cancelled and you
                // receive empty arrays.
                Log.i("COVID19", "User interaction was cancelled.");
            } else if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                Log.i("COVID19", "Permission granted, updates requested, starting location updates");
                startStep3();

            } else {
                // Permission denied.

                // Notify the img_user via a SnackBar that they have rejected a core permission for the
                // app, which makes the Activity useless. In a real app, core permissions would
                // typically be best requested during a welcome-screen flow.

                // Additionally, it is important to remember that a permission might have been
                // rejected without asking the img_user for permission (device policy or "Never ask
                // again" prompts). Therefore, a img_user interface affordance is typically implemented
                // when permissions are denied. Otherwise, your app could appear unresponsive to
                // touches or interactions which have required permissions.
                showSnackbar(R.string.permission_denied_explanation,
                        R.string.settings, new View.OnClickListener() {
                            @Override
                            public void onClick(View view) {
                                // Build intent that displays the App settings screen.
                                Intent intent = new Intent();
                                intent.setAction(
                                        Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                                Uri uri = Uri.fromParts("package",
                                        BuildConfig.APPLICATION_ID, null);
                                intent.setData(uri);
                                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                startActivity(intent);
                            }
                        });
            }
        }
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        LocalBroadcastManager.getInstance(this).unregisterReceiver(mMessageReceiver);
        stopService(new Intent(this, MyService.class));
        mAlreadyStartedService = false;
    }
    private void scheduleNotification (Notification notification , int delay) {
        Intent notificationIntent = new Intent( this, MyNotificationPublisher. class ) ;
        notificationIntent.putExtra(MyNotificationPublisher. NOTIFICATION_ID , 1 ) ;
        notificationIntent.putExtra(MyNotificationPublisher. NOTIFICATION , notification) ;
        PendingIntent pendingIntent = PendingIntent. getBroadcast ( this, 0 , notificationIntent , PendingIntent. FLAG_UPDATE_CURRENT ) ;
        long futureInMillis = SystemClock. elapsedRealtime () + delay ;
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context. ALARM_SERVICE ) ;
        assert alarmManager != null;
        alarmManager.set(AlarmManager. ELAPSED_REALTIME_WAKEUP , futureInMillis , pendingIntent) ;
    }
    private Notification getNotification (String content) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder( this, default_notification_channel_id ) ;
        builder.setContentTitle( "COVID19 Notification" ) ;
        builder.setContentText(content) ;
        builder.setSmallIcon(R.drawable.logo ) ;
        builder.setAutoCancel( true ) ;
        builder.setChannelId( NOTIFICATION_CHANNEL_ID ) ;
        return builder.build() ;
    }
    public static final String NOTIFICATION_CHANNEL_ID = "10001" ;
    private final static String default_notification_channel_id = "default" ;
}
