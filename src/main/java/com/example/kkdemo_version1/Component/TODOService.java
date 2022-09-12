package com.example.kkdemo_version1.Component;

import com.example.kkdemo_version1.Mappers.MessageMybatisRepository;
import com.example.kkdemo_version1.Model.Message;
import com.example.kkdemo_version1.Model.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.FieldPosition;
import java.text.ParsePosition;
import java.util.*;


/**
* Adding and deleting TODO
*/
@Component
public class TODOService {

    // Add TODOS to db
    public String addTODO(List<Object> messages, MessageMybatisRepository messageMybatisRepository){
        for (Object todo:messages) {
            Map<String,String> todoMap = (Map<String, String>) todo;
            Message message = new Message();
            message.setMessages_id(todoMap.get("id"));
            message.setMessages_senderId(todoMap.get("senderId"));
            message.setMessages_senderName(todoMap.get("senderName"));
            message.setMessages_receiverId(todoMap.get("receiverId"));
            message.setMessages_status(todoMap.get("status"));
            message.setMessages_type(todoMap.get("type"));
            message.setMessages_icon(todoMap.get("icon"));
            message.setMessages_caption(todoMap.get("caption"));
            message.setMessages_content(todoMap.get("content"));
            message.setMessages_URL(todoMap.get("URl"));
            message.setMessages_sendTime(todoMap.get("sendTime"));
            message.setMessages_setTime(todoMap.get("setTime"));
            messageMybatisRepository.insert(message);
        }
        return "Synchronize TODOs Success!";
    }

    // get target id user's TODOs
    public List<Map> getTODO(String id, MessageMybatisRepository messageMybatisRepository){
        List<Message> list= messageMybatisRepository.findByReceiverId(id);
        List<Map> todolist = new LinkedList<>();
        for(Message message:list){
            Map<String,Object> map = new HashMap<>();
            map.put("id",message.getMessages_id());
            map.put("senderId",message.getMessages_senderId());
            map.put("senderName",message.getMessages_senderName());
            map.put("receiverId",message.getMessages_receiverId());
            map.put("status",message.getMessages_status());
            map.put("type",message.getMessages_type());
            map.put("icon",message.getMessages_icon());
            map.put("caption",message.getMessages_caption());
            map.put("content",message.getMessages_content());
            map.put("URL",message.getMessages_URL());
            map.put("sendTime",message.getMessages_sendTime());
            map.put("setTime",message.getMessages_setTime());
            todolist.add(map);
        }
        return todolist;
    }


}
