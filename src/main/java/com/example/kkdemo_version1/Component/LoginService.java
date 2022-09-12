package com.example.kkdemo_version1.Component;

import com.example.kkdemo_version1.Mappers.UserMybatisRepository;
import com.example.kkdemo_version1.Model.User;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.memory.UserAttribute;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;

import java.util.List;
import java.util.Map;

/**
* User login Service
*/
@Component
public class LoginService{

    String DEFAULT_VALUE = null;

    private String _token;
    private RestTemplate restTemplate;
    private String  _authorizationHeader = "Authorization";
    private String githubUserInfoUrl = "https://api.github.com/user";
    private UserMybatisRepository _userMybatisRepository;


    public LoginService(UserMybatisRepository userMybatisRepository) {
        RestTemplateBuilder restTemplateBuilder = new RestTemplateBuilder();
        this._userMybatisRepository =userMybatisRepository;
        this.restTemplate = restTemplateBuilder.build();
    }

    public String registerUser(Map userinfo){


        // SET users DAO object
        User insertUser = new User();
        insertUser.setUsers_id(userinfo.get("id").toString());
        insertUser.setUsers_username(userinfo.get("login").toString());
        insertUser.setUsers_userAvatar(userinfo.get("avatar_url").toString());
        if(userinfo.get("email") != null){
            insertUser.setUsers_emailAddress(userinfo.get("email").toString());
        }
        else {
            insertUser.setUsers_emailAddress(DEFAULT_VALUE);
        }
        insertUser.setUsers_firstName(DEFAULT_VALUE);
        insertUser.setUsers_lastName(DEFAULT_VALUE);

        try{
            User user = _userMybatisRepository.findById(userinfo.get("id").toString());
            if(user == null){
                _userMybatisRepository.insert(insertUser);
            }else {
                _userMybatisRepository.update(insertUser);
            }
        }catch (Exception e)
        {
            return "Register User Failed!";
        }
        return "Register User Success!";
    }

    //
    public void onNewToken(String token) {
        //Data.setFcmToken(getSharedPreferences(HomeActivity.PREFS_FCM, HomeActivity.MODE_PRIVATE), token);

    }


    // GET user info using access token
    public ResponseEntity<Map> getOauthUserInfo(String accessToken) {

        // create headers
        HttpHeaders headers = new HttpHeaders();
        headers.add("Accept","application/json");
        // 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
        headers.add(_authorizationHeader,"token "+accessToken);

        // build the request
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<Map> responseEntity = restTemplate.exchange(githubUserInfoUrl,HttpMethod.GET,request,Map.class);

        return responseEntity;
    }

    // GET oauth Access Token
    public String getOauthAccessToken(OAuth2AuthorizedClientService authorizedClientService){
        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        OAuth2AuthenticationToken oauthToken =
                (OAuth2AuthenticationToken) authentication;

        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                oauthToken.getAuthorizedClientRegistrationId(),
                oauthToken.getName()
        );

        String accessToken = client.getAccessToken().getTokenValue();
        _token = accessToken;
        return  accessToken;
    }


    public String get_token(){
        return this._token;
    }


}
