package system.khortech.covid19_lockdown;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.util.Patterns;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import com.basgeekball.awesomevalidation.AwesomeValidation;
import com.basgeekball.awesomevalidation.ValidationStyle;
import com.basgeekball.awesomevalidation.utility.RegexTemplate;
import com.google.android.gms.maps.model.LatLng;
import com.google.common.collect.Range;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static android.app.Activity.RESULT_OK;
import static android.util.Patterns.EMAIL_ADDRESS;
import static com.basgeekball.awesomevalidation.utility.RegexTemplate.NOT_EMPTY;
import static com.basgeekball.awesomevalidation.utility.RegexTemplate.TELEPHONE;

public class LoginPage extends AppCompatActivity {
    public BluetoothAdapter BA;
    private static String countries[],selection;
    Button btn_login;
    private static final int IMAGE_PICK_CODE = 1000, PERMISSION_CODE = 1001;
    public static boolean is_first_login = false;
    private Spinner spinner_gender,spinner_status;
    EditText edit_text_name, edit_text_phone, edit_text_age,edit_text_postcode;
    public String info, TAG;
    AutoCompleteTextView auto_country;
    AwesomeValidation awesomeValidation;

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN_MR2)
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.registeration);
        if (!checkPermissions()) {
            Log.v("getPrmsn", "Permission is revoked");
            requestPermissions();
        }
        BluetoothManager bluetoothManager =  (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.JELLY_BEAN_MR2) {
            BA = bluetoothManager.getAdapter();
        } else {
            BA = BluetoothAdapter.getDefaultAdapter();
        }


        //initialization
        btn_login = findViewById(R.id.btn_login);
        edit_text_name = findViewById(R.id.edit_text_name);
        edit_text_phone = findViewById(R.id.edit_text_phone);
        edit_text_age = findViewById(R.id.edit_text_age);
        auto_country = findViewById(R.id.auto_country);
        edit_text_postcode=findViewById(R.id.edit_text_postcode);
        spinner_status=findViewById(R.id.spinner_status);
        spinner_gender = findViewById(R.id.spinner_gender);
        TAG = LoginPage.this.getClass().getSimpleName() + "dlzar";

        awesomeValidation = new AwesomeValidation(ValidationStyle.COLORATION);
        awesomeValidation.setColor(Color.BLUE);
        awesomeValidation.addValidation(edit_text_name, NOT_EMPTY, "User name required");
        awesomeValidation.addValidation(edit_text_phone, Patterns.PHONE, "Phone number is required");
        awesomeValidation.addValidation(edit_text_age, Range.closed(0, 120), "Your age is reburied");
        awesomeValidation.addValidation(auto_country, NOT_EMPTY,"Country is required ");
        awesomeValidation.addValidation(edit_text_postcode, NOT_EMPTY, "User postcode required");
        countries = this.getApplication().getResources().getStringArray(R.array.countries_array);
        ArrayAdapter<String> countryAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, countries);
        auto_country.setAdapter(countryAdapter);
        auto_country.setThreshold(1);
        auto_country.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long rowId) {
                selection = (String)parent.getItemAtPosition(position);
                Log.d(TAG, "onItemClick: "+selection);
                //TODO Do something with the selected text
            }
        });

        //hide actionbar
        this.getSupportActionBar().hide();


        //for Spinner
        String[] genders = new String[]{"Male", "Female"};
        ArrayAdapter<String> gender_adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, genders);
        spinner_gender.setAdapter(gender_adapter);

        String[] cases = new String[]{"COVID19", "None-COVID19","Recovered"};
        ArrayAdapter<String> status_adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, cases);
        spinner_status.setAdapter(status_adapter);

        //login button listener
        btn_login.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.KITKAT)
            @Override
            public void onClick(View view) {
                if (awesomeValidation.validate()) {
                    info="\nname:"+edit_text_name.getText().toString()+"\nemail: "+"\nphone: "+edit_text_phone.getText().toString()+"\nage:"+edit_text_age.getText().toString()+"\ncountry:"+auto_country.getText().toString()+"\ngender: "+spinner_gender.getSelectedItem().toString();
                    //TestResult profile=new TestResult(edit_text_name.getText().toString(),edit_text_email.getText().toString(),edit_text_phone.getText().toString(),edit_text_age.getText().toString(),edit_text_country.getText().toString(),spinner_gender.getSelectedItem().toString());
                    Log.d("dlzartag", "onClick: "+info);
                    MainActivity.cuser.setId(genId());
                    MainActivity.cuser.setName(edit_text_name.getText().toString());
                    MainActivity.cuser.setPhone(edit_text_phone.getText().toString());
                    MainActivity.cuser.setAge(Integer.parseInt(edit_text_age.getText().toString()));
                    MainActivity.cuser.setpostcode(edit_text_postcode.getText().toString());
                    MainActivity.cuser.setCountry(auto_country.getText().toString());
                    MainActivity.cuser.setGender(spinner_gender.getSelectedItem().toString());
                    MainActivity.cuser.setstatus(spinner_status.getSelectedItem().toString());
                    MainActivity.cuser.setMacAddress(getBluetoothMacAddress2());
                    is_first_login = true;
                    SaveRecord();
                    String str="id="+MainActivity.cuser.getId()+"&"+"name="+MainActivity.cuser.getName()+"&"+"age="+MainActivity.cuser.getAge()+"&"+"status="+MainActivity.cuser.getstatus()+"&"+"gender="+MainActivity.cuser.getGender()+"&"+"phone="+MainActivity.cuser.getPhone()+"&"+"postcode="+MainActivity.cuser.getpostcode()+"&"+"country="+MainActivity.cuser.getCountry()+"&"+"macaddress="+MainActivity.cuser.getMacAddress();
                    new SavePerson().execute(str);
                    Intent ii =new Intent(LoginPage.this, MainActivity.class);
                    startActivity(ii);
                } else {
                    Toast.makeText(LoginPage.this, "Not vailed", Toast.LENGTH_LONG).show();
                }

            }
        });


    }



    //for user image

    @Override
    public void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == RESULT_OK && requestCode == IMAGE_PICK_CODE) {
        }
    }



    private void SaveRecord() {
        String root = Environment.getExternalStorageDirectory().toString();
        File my2Dir = new File(root  + "/locakdown-data");
        if(!my2Dir.exists())
            my2Dir.mkdirs();
        root = Environment.getExternalStorageDirectory().toString()+"/locakdown-data";
        File myDir = new File(root  + "/cuser");
        if(!myDir.exists())
            myDir.mkdirs();
        //Random generator = new Random();
        //int n = MainActivity.cuser.getId();
        String fname = "cuser.txt";
        File file = new File (myDir, fname);
        //Log.i("saveximage", "onActivityResult: error");
        if (file.exists ()) file.delete ();
        try {
            FileWriter fw=new FileWriter(file);
            String currentDate = new SimpleDateFormat("dd-MM-yyyy", Locale.getDefault()).format(new Date());

            fw.write("id="+MainActivity.cuser.getId()+";"+"name="+MainActivity.cuser.getName()+";"+"age="+MainActivity.cuser.getAge()+";"+"status="+MainActivity.cuser.getstatus()+";"+"gender="+MainActivity.cuser.getGender()+";"+"phone="+MainActivity.cuser.getPhone()+";"+"date="+currentDate+";"+"postcode="+MainActivity.cuser.getpostcode()+";"+"country="+MainActivity.cuser.getCountry()+";"+"macaddress="+MainActivity.cuser.getMacAddress());
            fw.flush();
            fw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
//"lat=" + lat + "&lng="+lng+"&userid="+userID
private static class SavePerson extends AsyncTask<String, Void, Void> {
    @Override
    protected Void doInBackground(String... params) {
        String strUrl = "https://khortech.com/covid/savePerson.php";
        String sb = "Success: ";
        URL url = null;
        try {
            url = new URL(strUrl);

            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);
            OutputStreamWriter outputStreamWriter = new OutputStreamWriter(
                    connection.getOutputStream());
            Log.i("serverrr", params[0]);
            outputStreamWriter.write(params[0]);
            outputStreamWriter.flush();
            outputStreamWriter.close();

            InputStream iStream = connection.getInputStream();
            BufferedReader reader = new BufferedReader(new
                    InputStreamReader(iStream));


            String line = "";

            while ((line = reader.readLine()) != null) {
                sb = sb + line;
            }

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

    private boolean checkPermissions() {
        int permissionState1 = ActivityCompat.checkSelfPermission(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE);

        int permissionState2 = ActivityCompat.checkSelfPermission(this,
                Manifest.permission.READ_EXTERNAL_STORAGE);
        int permissionState3 = ActivityCompat.checkSelfPermission(this,
                Manifest.permission.BLUETOOTH);
        int permissionState4 = ActivityCompat.checkSelfPermission(this,
                Manifest.permission.BLUETOOTH_ADMIN);
        int permissionState5 = ActivityCompat.checkSelfPermission(this,
                Manifest.permission.BLUETOOTH_PRIVILEGED);
        return permissionState1 == PackageManager.PERMISSION_GRANTED && permissionState2 == PackageManager.PERMISSION_GRANTED && permissionState3 == PackageManager.PERMISSION_GRANTED && permissionState5 == PackageManager.PERMISSION_GRANTED && permissionState5 == PackageManager.PERMISSION_GRANTED;

    }
    private void requestPermissions() {

        boolean shouldProvideRationale =
                ActivityCompat.shouldShowRequestPermissionRationale(this,
                        Manifest.permission.READ_EXTERNAL_STORAGE);


        boolean shouldProvideRationale2 =
                ActivityCompat.shouldShowRequestPermissionRationale(this,
                        Manifest.permission.READ_EXTERNAL_STORAGE);

        boolean shouldProvideRationale3 =
                ActivityCompat.shouldShowRequestPermissionRationale(this,
                        Manifest.permission.BLUETOOTH);
        boolean shouldProvideRationale4 =
                ActivityCompat.shouldShowRequestPermissionRationale(this,
                        Manifest.permission.BLUETOOTH_ADMIN);
        boolean shouldProvideRationale5 =
                ActivityCompat.shouldShowRequestPermissionRationale(this,
                        Manifest.permission.BLUETOOTH_PRIVILEGED);
        // Provide an additional rationale to the img_user. This would happen if the img_user denied the
        // request previously, but didn't check the "Don't ask again" checkbox.
        if (shouldProvideRationale || shouldProvideRationale2 || shouldProvideRationale3 || shouldProvideRationale4 || shouldProvideRationale5) {
            Log.i("COVID19", "Displaying permission rationale to provide additional context.");

        } else {
            Log.i("COVID19", "Requesting permission");
            // Request permission. It's possible this can be auto answered if device policy
            // sets the permission in a given state or the img_user denied the permission
            // previously and checked "Never ask again".
            ActivityCompat.requestPermissions(LoginPage.this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION,Manifest.permission.BLUETOOTH, Manifest.permission.BLUETOOTH_PRIVILEGED, Manifest.permission.BLUETOOTH_ADMIN},
                    REQUEST_PERMISSIONS_REQUEST_CODE);
        }
    }
    private static final int REQUEST_PERMISSIONS_REQUEST_CODE = 35;
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        Log.i("LockDown", "onRequestPermissionResult");
        if (requestCode == REQUEST_PERMISSIONS_REQUEST_CODE) {
            if (grantResults.length <= 0) {
                // If img_user interaction was interrupted, the permission request is cancelled and you
                // receive empty arrays.
                Log.i("COVID19", "User interaction was cancelled.");
            } else if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {

                Log.i("COVID19", "Permission granted, updates requested, starting location updates");

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

            }
        }
    }
    public static String genId(){

        return   UUID.randomUUID().toString();
    }
    public static final String SECURE_SETTINGS_BLUETOOTH_ADDRESS = "bluetooth_address";


    public String getBluetoothMacAddress() {
        String address = BA.getAddress();
        if (address.equals("02:00:00:00:00:00")) {

           try {
                ContentResolver mContentResolver = getApplicationContext().getContentResolver();

                address = Settings.Secure.getString(mContentResolver, SECURE_SETTINGS_BLUETOOTH_ADDRESS);
                //DebugReportOnLocat.ln(">>>>G >>>> mac " + address);

            } catch (Exception e) {


            }


        } else {

            // System.out.println(">>>>>G sucess to get mac address " + address);
        }
        return address;
    }
    @RequiresApi(api = Build.VERSION_CODES.KITKAT)
    private String getBluetoothMacAddress2() {
        String bluetoothMacAddress = "";
        try {
            Field mServiceField = BA.getClass().getDeclaredField("mService");
            mServiceField.setAccessible(true);

            Object btManagerService = mServiceField.get(BA);

            if (btManagerService != null) {
                bluetoothMacAddress = (String) btManagerService.getClass().getMethod("getAddress").invoke(btManagerService);
            }
        } catch (NoSuchFieldException | NoSuchMethodException | IllegalAccessException | InvocationTargetException ignore) {

        }
        return bluetoothMacAddress;
    }
}

