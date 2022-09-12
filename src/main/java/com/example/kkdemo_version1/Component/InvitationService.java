package com.example.kkdemo_version1.Component;

import com.example.kkdemo_version1.Mappers.InvitationMybatisRepository;
import com.example.kkdemo_version1.Model.Invitation;
import org.springframework.stereotype.Component;

import java.util.*;


/**
* Send add friend invitation to another user
*/
@Component
public class InvitationService {

    public int AddInvitation(Map invitation, InvitationMybatisRepository invitationMybatisRepository){
        System.out.println(CheckEmail(invitation,invitationMybatisRepository));
        if(CheckEmail(invitation,invitationMybatisRepository)==1){
            Invitation invitation1 = new Invitation();
            invitation1.setInvitations_id(invitation.get("id").toString());
            invitation1.setInvitations_senderId(invitation.get("senderId").toString());
            invitation1.setInvitations_senderName(invitation.get("senderName").toString());
            invitation1.setInvitations_icon(invitation.get("icon").toString());
            invitation1.setInvitations_receiverEmail(invitation.get("receiverEmail").toString());
            invitation1.setInvitations_status(invitation.get("status").toString());
            invitation1.setInvitations_type(invitation.get("type").toString());
            return invitationMybatisRepository.insert(invitation1);
        }else {
            return 2;
        }
    }

    public List<Map> GetInvitation(String email, InvitationMybatisRepository invitationMybatisRepository){
        List<Invitation> invitationList = invitationMybatisRepository.findByReceiverEmail(email);
        List<Map> maplist = new LinkedList<>();
        for(Invitation invitation:invitationList){
            Map<String,Object> map = new HashMap<>();
            map.put("id",invitation.getInvitations_id());
            map.put("senderId",invitation.getInvitations_senderId());
            map.put("senderName",invitation.getInvitations_senderName());
            map.put("icon",invitation.getInvitations_icon());
            map.put("receiverEmail",invitation.getInvitations_receiverEmail());
            map.put("status",invitation.getInvitations_status());
            map.put("type",invitation.getInvitations_type());
            maplist.add(map);
        }
        return maplist;
    }


    public List<Map> GetInvitationById(String id, InvitationMybatisRepository invitationMybatisRepository){
        List<Invitation> invitationList = invitationMybatisRepository.findByID(id);
        List<Map> maplist = new LinkedList<>();
        for(Invitation invitation:invitationList){
            Map<String,Object> map = new HashMap<>();
            map.put("id",invitation.getInvitations_id());
            map.put("senderId",invitation.getInvitations_senderId());
            map.put("senderName",invitation.getInvitations_senderName());
            map.put("icon",invitation.getInvitations_icon());
            map.put("receiverEmail",invitation.getInvitations_receiverEmail());
            map.put("status",invitation.getInvitations_status());
            map.put("type",invitation.getInvitations_type());
            maplist.add(map);
        }
        return maplist;
    }
    public int ConsentInvitation(String id, InvitationMybatisRepository invitationMybatisRepository){
        return invitationMybatisRepository.updateStatusToConsent(id);
    }

    public int DeclineInvitation(String id, InvitationMybatisRepository invitationMybatisRepository){
        return invitationMybatisRepository.updateStatusToDecline(id);
    }

    public int CheckEmail(Map invitation, InvitationMybatisRepository invitationMybatisRepository){
        List list =invitationMybatisRepository.findByEmail(invitation.get("receiverEmail").toString(),invitation.get("senderId").toString());
        if(list.isEmpty()){
            return 1;
        }else {
            return 2;
        }
    }
}
