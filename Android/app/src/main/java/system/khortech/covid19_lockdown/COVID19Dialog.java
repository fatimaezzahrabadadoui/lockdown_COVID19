package system.khortech.covid19_lockdown;

import android.app.AlertDialog;
import android.app.Dialog;
import android.os.Bundle;

import androidx.fragment.app.DialogFragment;

public class COVID19Dialog extends DialogFragment {

    public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder b = new AlertDialog.Builder(getActivity());
        b.setTitle("COVID19 Area Alert");
        b.setMessage("You are approaching area which has been ferquently visited by infected users");
        b.setCancelable(false);
        b.setPositiveButton("OK", null);
        return b.create();
    }
}