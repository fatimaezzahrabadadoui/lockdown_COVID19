package system.khortech.covid19_lockdown;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.util.Base64;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class TestResult  extends AppCompatActivity {

    public static String name,email,phone,age,country,gender;
    ImageView imageView;
    TextView text_view_name,text_view_phone,text_view_country,text_view_age,text_view_gender,text_view_status,text_view_postcode,text_view_macaddress;
    boolean tests=true;
    private static final String URL_Token_Server = "https://khortech.com/saveUser.php";


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.profile);
        text_view_name = findViewById(R.id.text_view_name);
        text_view_phone = findViewById(R.id.text_view_phone);
        text_view_country = findViewById(R.id.text_res_country);
        text_view_age = findViewById(R.id.text_view_age);
        text_view_gender = findViewById(R.id.text_view_gender);
        text_view_status = findViewById(R.id.text_view_status);
        text_view_postcode = findViewById(R.id.text_res_postcode);
        text_view_macaddress = findViewById(R.id.text_res_macaddress);



        //Bundle bundle=getArguments();
        if (MainActivity.cuser != null) {
            text_view_name.setText(MainActivity.cuser.getName());
            text_view_phone.setText(MainActivity.cuser.getPhone());
            text_view_country.setText(MainActivity.cuser.getCountry());
            text_view_age.setText(MainActivity.cuser.getAge() + "");
            text_view_gender.setText(MainActivity.cuser.getGender());
            text_view_status.setText(MainActivity.cuser.getstatus());
            text_view_postcode.setText(MainActivity.cuser.getpostcode());
            text_view_macaddress.setText(MainActivity.cuser.getMacAddress());
        }
        else {
            //getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container, MainActivity.loginPage).commit();
        }


    }



}
