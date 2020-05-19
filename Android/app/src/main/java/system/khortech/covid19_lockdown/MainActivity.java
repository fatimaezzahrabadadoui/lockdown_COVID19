package system.khortech.covid19_lockdown;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.Settings;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

public class MainActivity extends AppCompatActivity {
    public static User cuser;
    private final static int REQUEST_STORAGE = 202;

    @RequiresApi(api = Build.VERSION_CODES.M)
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        //Read text from file
        String root = Environment.getExternalStorageDirectory().toString() + "/locakdown-data";
        File file = new File(root + "/cuser/cuser.txt");
        if (file.exists()) {
            cuser = new User();
            StringBuilder text = new StringBuilder();

            try {
                BufferedReader br = new BufferedReader(new FileReader(file));
                String line;

                while ((line = br.readLine()) != null) {
                    text.append(line);
                    text.append('\n');
                }
                br.close();
            } catch (IOException e) {
                //You'll need to add proper error handling here
            }
            String[] data = text.toString().split(";");

            cuser.setId(data[0].split("=")[1]);
            cuser.setName(data[1].split("=")[1]);
            cuser.setAge(Integer.parseInt(data[2].split("=")[1]));
            cuser.setstatus(data[3].split("=")[1]);
            cuser.setGender(data[4].split("=")[1]);
            cuser.setPhone(data[5].split("=")[1]);
            cuser.setpostcode(data[7].split("=")[1]);
            cuser.setCountry(data[8].split("=")[1]);
            cuser.setMacAddress(data[9].split("=")[1]);

        } else {
            cuser = null;
        }
        if (cuser == null) {
            cuser = new User();
            Intent intent = new Intent(MainActivity.this, LoginPage.class);
            startActivity(intent);
        } else {
            Intent intent = new Intent(MainActivity.this, MapsActivity.class);
            startActivity(intent);
        }

    }




    @Override
    protected void onResume() {
        super.onResume();
        if(isNetworkConnected()){
           // new TestResult().uploadAll();
        }
    }

    public boolean isNetworkConnected() {
        ConnectivityManager cm = (ConnectivityManager) getSystemService(this.CONNECTIVITY_SERVICE);

        return cm.getActiveNetworkInfo() != null && cm.getActiveNetworkInfo().isConnected();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {

        MenuInflater inflater=getMenuInflater();
        inflater.inflate(R.menu.profile_setting,menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {

            case R.id.setting_profile:
                //Toast.makeText(getApplicationContext(), "setting profile ", Toast.LENGTH_LONG).show();
                Intent intent2 = new Intent(MainActivity.this, TestResult.class);
                startActivity(intent2);
                break;
            default:
                return super.onOptionsItemSelected(item);
        }
        return true;
    }

}
