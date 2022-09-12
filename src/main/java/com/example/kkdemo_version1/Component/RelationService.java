package com.example.kkdemo_version1.Component;

import com.example.kkdemo_version1.Mappers.RelationMybatisRepository;
import com.example.kkdemo_version1.Mappers.UserMybatisRepository;
import com.example.kkdemo_version1.Model.Relation;
import com.example.kkdemo_version1.Model.User;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

/**
* User relationship service
* 
*/
@Component
public class RelationService {
    public int AddRelation(User userinfo,Map<String,Object> invitationBody,String type,RelationMybatisRepository relationMybatisRepository, UserMybatisRepository userMybatisRepository){
        if(CheckIfExist(invitationBody.get("senderId").toString(),userinfo.getUsers_id(),relationMybatisRepository)==1){
            Relation relation1 = new Relation();
            relation1.setRelations_first_id(invitationBody.get("senderId").toString());
            relation1.setRelations_second_id(userinfo.getUsers_id());
            relation1.setRelations_second_name(userinfo.getUsers_username());
            relation1.setRelations_avatar(userinfo.getUsers_userAvatar());
            relation1.setRelations_type(type);

            if(!userinfo.getUsers_id().equals(invitationBody.get("senderId"))){
                Relation relation2 = new Relation();
                relation2.setRelations_first_id(userinfo.getUsers_id());
                relation2.setRelations_second_id(invitationBody.get("senderId").toString());
                relation2.setRelations_second_name(invitationBody.get("senderName").toString());
                relation2.setRelations_avatar(invitationBody.get("icon").toString());
                relation2.setRelations_type(type);
                relationMybatisRepository.insert(relation2);
            }
            return relationMybatisRepository.insert(relation1);
        }
        else {
            return 2;
        }
    }

    public List<Map> GetRelation(String id,RelationMybatisRepository relationMybatisRepository){
        List<Relation> relations = relationMybatisRepository.findByFirstId(id);
        System.out.println(id);
        List<Map> maplist = new LinkedList<>();
        for(Relation relation:relations){
            Map<String,Object> map = new HashMap<>();
            map.put("id",relation.getRelations_second_id());
            map.put("icon",relation.getRelations_avatar());
            map.put("caption",relation.getRelations_second_name());
            maplist.add(map);
        }
        return  maplist;
    }

    public int CheckIfExist(String first,String second,RelationMybatisRepository relationMybatisRepository){
        List list = relationMybatisRepository.findByBothId(first,second);
        if(list.isEmpty()){
            return 1;
        }else {
            return 2;
        }
    }

}
