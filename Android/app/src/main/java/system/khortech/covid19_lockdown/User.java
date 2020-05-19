package system.khortech.covid19_lockdown;

import android.graphics.Bitmap;

public class User {
    String id;
    String name,phone,country,gender,postcode,status;
    int age;
    String MacAddress;
    public String getpostcode() {
        return postcode;
    }
    public void setpostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getstatus() {
        return status;
    }
    public void setstatus(String status) {
        this.status = status;
    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }

    public String getMacAddress() {
        return MacAddress;
    }
    public void setMacAddress(String MacAddress) {
        this.MacAddress = MacAddress;
    }
}
