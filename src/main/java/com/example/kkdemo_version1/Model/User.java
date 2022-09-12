package com.example.kkdemo_version1.Model;


import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//Basic User object
public class User implements OAuth2User {

    private List<GrantedAuthority> authorities =
            AuthorityUtils.createAuthorityList("ROLE_USER");

    private Map<String, Object> attributes;

    // create table users(id char,username char,firstName char,lastName char,userAvatar char,emailAddress char);
    // Unique Identifier
    private String users_id;
    // Username in Application
    private String users_username;
    // Real name
    private String users_firstName;
    // Real name
    private String users_lastName;
    // User Avatar file path
    private String users_userAvatar;
    // Email Address
    private String users_emailAddress;

    private String users_device_token;

    private String login;

    // Constructor
    public User(){

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public Map<String, Object> getAttributes() {
        if (this.attributes == null) {
            this.attributes = new HashMap<>();
            this.attributes.put("users_id", this.getUsers_id());
            this.attributes.put("name", this.getUsers_username());
            this.attributes.put("login", this.getLogin());
            this.attributes.put("email", this.getUsers_emailAddress());
        }
        return attributes;
    }

    // region Getter Setter  ************************************************************

    public String getUsers_id() {
        return users_id;
    }

    public void setUsers_id(String users_id) {
        this.users_id = users_id;
    }

    public String getUsers_username() {
        return users_username;
    }

    public void setUsers_username(String users_username) {
        this.users_username = users_username;
    }

    public String getUsers_firstName() {
        return users_firstName;
    }

    public void setUsers_firstName(String users_firstName) {
        this.users_firstName = users_firstName;
    }

    public String getUsers_lastName() {
        return users_lastName;
    }

    public void setUsers_lastName(String users_lastName) {
        this.users_lastName = users_lastName;
    }

    public String getUsers_userAvatar() {
        return users_userAvatar;
    }

    public void setUsers_userAvatar(String users_userAvatar) {
        this.users_userAvatar = users_userAvatar;
    }

    public String getUsers_emailAddress() {
        return users_emailAddress;
    }

    public void setUsers_emailAddress(String users_emailAddress) {
        this.users_emailAddress = users_emailAddress;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getUsers_device_token() {
        return users_device_token;
    }

    public void setUsers_device_token(String users_device_token) {
        this.users_device_token = users_device_token;
    }

    @Override
    public String getName() {
        return users_username;
    }

// region End of Getter Setter  *****************************************************

}
