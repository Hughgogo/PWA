package com.example.kkdemo_version1.Controllers;

import com.example.kkdemo_version1.Component.*;
import com.example.kkdemo_version1.Mappers.InvitationMybatisRepository;
import com.example.kkdemo_version1.Mappers.MessageMybatisRepository;
import com.example.kkdemo_version1.Mappers.RelationMybatisRepository;
import com.example.kkdemo_version1.Mappers.UserMybatisRepository;
import com.example.kkdemo_version1.Model.User;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.messaging.FirebaseMessagingException;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.URI;
import java.util.*;

@RestController
public class UserServiceController {

    private UserInfoService userInfoService;
    private LoginService loginService;
    private OAuth2AuthorizedClientService oauth2AuthorizedClientService;
    private UserMybatisRepository userMybatisRepository;
    private MessageMybatisRepository messageMybatisRepository;
    private InvitationMybatisRepository invitationMybatisRepository;
    private RelationMybatisRepository relationMybatisRepository;
    private TODOService todoService;
    private FirebaseMessagingService firebaseMessagingService;
    private FirebaseApp Firebaseapp;
    private InvitationService invitationService;
    private RelationService relationService;


    @Autowired
    public void setOauth2AuthorizedClientService(OAuth2AuthorizedClientService oauth2AuthorizedClientService) {
        this.oauth2AuthorizedClientService = oauth2AuthorizedClientService;
    }

    @Autowired
    public void setMessageMybatisRepository(MessageMybatisRepository messageMybatisRepository) {
        this.messageMybatisRepository = messageMybatisRepository;
    }

    @Autowired
    public void setInvitationMybatisRepository(InvitationMybatisRepository invitationMybatisRepository) {
        this.invitationMybatisRepository = invitationMybatisRepository;
    }

    @Autowired
    public void setUserInfoService(UserInfoService service) {
        this.userInfoService = service;
    }

    @Autowired
    public void setLoginService(LoginService service) {
        this.loginService = service;
    }

    @Autowired
    public void setTodoService(TODOService service) {
        this.todoService = service;
    }

    @Autowired
    public void setFirebaseMessagingService(FirebaseMessagingService service) throws IOException {
        this.firebaseMessagingService = service;
        this.Firebaseapp = service.GetFirebaseApp();
    }

    @Autowired
    public void setInvitationService(InvitationService service) throws IOException {
        this.invitationService = service;
    }

    @Autowired
    public void setRelationService(RelationService service) throws IOException {
        this.relationService = service;
    }

    @Autowired
    public void setRelationMybatisRepository(RelationMybatisRepository relationMybatisRepository) throws IOException {
        this.relationMybatisRepository = relationMybatisRepository;
    }

    @Autowired
    public void  setUserMybatisRepository(UserMybatisRepository userMybatisRepository){
        this.userMybatisRepository = userMybatisRepository;
    }


    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }


    @RequestMapping(value = "/userservice/getinfo", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> GetUserInfo(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User user = (OAuth2User)auth.getPrincipal();
        Map<String,Object> map = new HashMap<>();
        User userInfo = userInfoService.GetUserInfo(user);
        map.put("id",userInfo.getUsers_id());
        map.put("username",userInfo.getUsers_username());
        map.put("profileavatar",userInfo.getUsers_userAvatar());
        map.put("email",userInfo.getUsers_emailAddress());
        return map;
    }

    @RequestMapping(value = "/userservice/getodos", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> GetTODOs(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User user = (OAuth2User)auth.getPrincipal();
        Map<String,Object> map = new HashMap<>();
        User userInfo = userInfoService.GetUserInfo(user);
        List<Map> list = todoService.getTODO(userInfo.getUsers_id(),messageMybatisRepository);
        map.put("todos",list);
        return map;
    }

    @RequestMapping(value = "/userservice/sendInvitation", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> sendInvitation(@RequestBody Object payload){
        Map<String,Object> body = (Map<String, Object>)payload;
        Map<String,Object> map = new HashMap<>();
        int result =invitationService.AddInvitation(body,invitationMybatisRepository);
        if(result == 1){
            map.put("status",200);
            map.put("msg","Send Invitation Success");
        }else if(result == 2){
            map.put("status",200);
            map.put("msg","Duplicate Invitation");
        }else {
            map.put("status",200);
            map.put("msg","Failed to send Invitation");
        }
        return map;
    }

    @RequestMapping(value = "/userservice/geInvitation", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> GetInvitation(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User user = (OAuth2User)auth.getPrincipal();
        Map<String,Object> map = new HashMap<>();
        User userInfo = userInfoService.GetUserInfo(user);
        List<Map> list = invitationService.GetInvitation(userInfo.getUsers_emailAddress(),invitationMybatisRepository);
        map.put("msg",200);
        map.put("body",list);
        return map;
    }

    @RequestMapping(value = "/userservice/getRelations", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> GetRelations(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User user = (OAuth2User)auth.getPrincipal();
        Map<String,Object> map = new HashMap<>();
        User userInfo = userInfoService.GetUserInfo(user);
        List<Map> list = relationService.GetRelation(userInfo.getUsers_id(),relationMybatisRepository);
        map.put("msg",200);
        map.put("body",list);
        return map;
    }

    @RequestMapping(value = "/userservice/consentInvitation", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> ConsentInvitation(@RequestBody Object payload){
        Map<String,Object> body = (Map<String, Object>)payload;

        System.out.println(payload);

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User user = (OAuth2User)auth.getPrincipal();
        User userInfo = userInfoService.GetUserInfo(user);

        Map<String,Object> map = new HashMap<>();
        String type ="1";
        if(relationService.AddRelation(userInfo,body,type,relationMybatisRepository,userMybatisRepository)==1){
            invitationService.ConsentInvitation(body.get("id").toString(),invitationMybatisRepository);
            map.put("status",200);
            map.put("msg","Add friend Success!");
        }else {
            map.put("status",302);
            map.put("msg","Already Added Friend");
        }
        return map;
    }

    @RequestMapping(value = "/userservice/declineInvitation", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> DeclineInvitation(@RequestBody Object payload){
        Map<String,Object> body = (Map<String, Object>)payload;

        System.out.println(payload);

        Map<String,Object> map = new HashMap<>();
        if(invitationService.DeclineInvitation(body.get("id").toString(),invitationMybatisRepository)==1){
            map.put("status",200);
            map.put("msg","Declined Success");
        }else {
            map.put("status",302);
            map.put("msg","Declined Failed");
        }
        return map;
    }


    @RequestMapping(value = "/messaging/getpublickey", method = RequestMethod.GET)
    @ResponseBody
    @CrossOrigin
    public String GetFirebaseMessagingPublicKey(){
        return "BDGZr6CGTp9mM0CoRCzWimtVH84DqpK25vLW9ZX0aOTjzulUAopmNuvwX6p5zo11jB-6KP-9WBlLTD1W6ZklpXg";
    }

    @RequestMapping(value = "/messaging/register", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public void RegisterFirebaseMessagingUser(@RequestBody Object payload) throws FirebaseAuthException, FirebaseMessagingException {
        //String customToken = FirebaseAuth.getInstance().createCustomToken(uid);
        Map<String,Object> body = (Map<String, Object>)payload;
        String messagingToken = (String) body.get("messagingToken");


        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        OAuth2User user = (OAuth2User)auth.getPrincipal();

        userInfoService.UpdateDeviceToken(user,messagingToken);
        firebaseMessagingService.SendFireBaseMessage(messagingToken);
    }




    @RequestMapping(value = "/userservice/updateinfo", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> UpdateUserInfo(){
        System.out.println("userinfo");
        Map<String,Object> map = new HashMap<>();
        map.put("status",200);
        return map;
    }



    @RequestMapping(value = "/userservice/addNewtodo", method = RequestMethod.POST)
    @ResponseBody
    @CrossOrigin
    public Map<String,Object> AddNew(@RequestBody List<Object> payload){
        System.out.println(payload);
        TODOService todoService = new TODOService();
        todoService.addTODO(payload,messageMybatisRepository);
        Map<String,Object> map = new HashMap<>();
        map.put("status",200);
        map.put("msg","Synchronize TODOs Success!");
        return map;
    }


}
