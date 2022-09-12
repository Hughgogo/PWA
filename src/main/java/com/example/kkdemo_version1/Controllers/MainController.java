package com.example.kkdemo_version1.Controllers;

import com.example.kkdemo_version1.Component.FirebaseMessagingService;
import com.example.kkdemo_version1.Component.LoginService;
import com.example.kkdemo_version1.Mappers.UserMybatisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@Controller
public class MainController {

    private  OAuth2AuthorizedClientService oauth2AuthorizedClientService;
    private UserMybatisRepository userMybatisRepository;
    private FirebaseMessagingService firebaseMessagingService;

    @Autowired
    public void setOauth2AuthorizedClientService(OAuth2AuthorizedClientService oauth2AuthorizedClientService) {
        this.oauth2AuthorizedClientService = oauth2AuthorizedClientService;
    }


    @Autowired
    public  void setFirebaseMessagingService(FirebaseMessagingService firebaseMessagingService){
        this.firebaseMessagingService = firebaseMessagingService;
    }

    @Autowired
    public void  setUserMybatisRepository(UserMybatisRepository userMybatisRepository){
        this.userMybatisRepository = userMybatisRepository;
    }

    public MainController() {
    }

    @RequestMapping (value = "/", method = RequestMethod.GET)
    public String GetDefaultIndex(){
        return "index";
    }

    @RequestMapping (value = "/loginSuccess", method = RequestMethod.GET)
    public String LoginSuccess(){
        LoginService loginService =new LoginService(userMybatisRepository);
        try{
            String token =loginService.getOauthAccessToken(oauth2AuthorizedClientService);
            Map userInfo = loginService.getOauthUserInfo(token).getBody();
            loginService.registerUser(userInfo);
            System.out.println(loginService.getOauthAccessToken(oauth2AuthorizedClientService));
        }catch (NullPointerException e){
            return "index";
        }
        return "index";
    }


    @RequestMapping (value = "/index.html", method = RequestMethod.GET)
    public String GetIndex(){
        return "index";
    }

    @RequestMapping (value = "/static/index.html", method = RequestMethod.GET)
    public String GetStaticIndex(){
        return "index";
    }

}
