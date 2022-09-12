package com.example.kkdemo_version1.Model;

import java.util.Map;

public class Account {

    // create table accounts(id char,userId char,emailAddress char,_password char,_status int);
    // Unique Account Identifier, Related with User ID
    private String id;
    // Related with User ID
    private String userId;
    // Email Address
    private String emailAddress;
    // Password
    private String password;
    // Account status
    private int status;

    // Constructor
    public Account(Map userInfoMap){

    }

    // region Getter Setter  ************************************************************


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }


    // region End of Getter Setter  *****************************************************

}
