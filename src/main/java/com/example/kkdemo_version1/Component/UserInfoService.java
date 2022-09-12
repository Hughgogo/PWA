package com.example.kkdemo_version1.Component;

import com.example.kkdemo_version1.Mappers.UserMybatisRepository;
import com.example.kkdemo_version1.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;

/**
* User info service 
*/
@Component
public class UserInfoService {

    private UserMybatisRepository userMybatisRepository;

    @Autowired
    public void  setUserMybatisRepository(UserMybatisRepository userMybatisRepository){
        this.userMybatisRepository = userMybatisRepository;
    }

    public User GetUserInfo(OAuth2User user){
        String id = user.getAttribute("id").toString();
        return userMybatisRepository.findById(id);
    }

    public int UpdateDeviceToken(OAuth2User user,String messagingToken){
        String id = user.getAttribute("id").toString();
        User user1 = userMybatisRepository.findById(id);
        user1.setUsers_device_token(messagingToken);
        return userMybatisRepository.updateDeviceToken(user1);
    }


    public String userinfo(){
        return "success!";
    }
}
