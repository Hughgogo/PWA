package com.example.kkdemo_version1.Model;

import org.apache.kafka.common.protocol.types.Field;

import java.sql.Timestamp;

public class Message {

     // Unique message id
    private String messages_id;
    // Sender id
    private String messages_senderId;
    // Sender id
    private String messages_senderName;
    // Receiver id
    private String messages_receiverId;
    // Message type
    private String messages_type;
    // Message type
    private String messages_status;
    // Message caption
    private String messages_icon;
    // Message caption
    private String messages_caption;
    // Message content
    private String messages_content;
    // Message content
    private String messages_URL;
    // Message set time
    private String messages_setTime;
    // Message expire time
    private String  messages_expireTime;
    // Message send time
    private String messages_sendTime;

    // Constructor
    public void Message(){

    }

    // region Getter Setter  ************************************************************

    public String getMessages_id() {
        return messages_id;
    }

    public void setMessages_id(String messages_id) {
        this.messages_id = messages_id;
    }

    public String getMessages_senderId() {
        return messages_senderId;
    }

    public void setMessages_senderId(String messages_senderId) {
        this.messages_senderId = messages_senderId;
    }

    public String getMessages_senderName() {
        return messages_senderName;
    }

    public void setMessages_senderName(String messages_senderName) {
        this.messages_senderName = messages_senderName;
    }

    public String getMessages_receiverId() {
        return messages_receiverId;
    }

    public void setMessages_receiverId(String messages_receiverId) {
        this.messages_receiverId = messages_receiverId;
    }

    public String getMessages_status() {
        return messages_status;
    }

    public void setMessages_status(String messages_status) {
        this.messages_status = messages_status;
    }

    public String getMessages_type() {
        return messages_type;
    }

    public void setMessages_type(String messages_type) {
        this.messages_type = messages_type;
    }

    public String getMessages_icon() {
        return messages_icon;
    }

    public void setMessages_icon(String messages_icon) {
        this.messages_icon = messages_icon;
    }

    public String getMessages_caption() {
        return messages_caption;
    }

    public void setMessages_caption(String messages_caption) {
        this.messages_caption = messages_caption;
    }

    public String getMessages_content() {
        return messages_content;
    }

    public void setMessages_content(String messages_content) {
        this.messages_content = messages_content;
    }

    public String getMessages_URL() {
        return messages_URL;
    }

    public void setMessages_URL(String messages_URL) {
        this.messages_URL = messages_URL;
    }

    public String getMessages_setTime() {
        return messages_setTime;
    }

    public void setMessages_setTime(String messages_setTime) {
        this.messages_setTime = messages_setTime;
    }

    public String getMessages_expireTime() {
        return messages_expireTime;
    }

    public void setMessages_expireTime(String messages_expireTime) {
        this.messages_expireTime = messages_expireTime;
    }

    public String getMessages_sendTime() {
        return messages_sendTime;
    }

    public void setMessages_sendTime(String messages_sendTime) {
        this.messages_sendTime = messages_sendTime;
    }


    // region End of Getter Setter  *****************************************************

}
