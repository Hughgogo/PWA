package com.example.kkdemo_version1.Mappers;

import com.example.kkdemo_version1.Model.Message;
import org.apache.ibatis.annotations.*;

import java.util.List;

/*
messages
		long		long			long			int		string  string	timestamp	timestamp		timestamp
		messages_id	messages_send_users_id	messages_receiver_users_id	message_type    message_caption    messages_content	messages_set_time	messages_expire_time	message_send_time
				refers to users_id		refers to users_id
* */
@Mapper
public interface MessageMybatisRepository {
    @Select("SELECT * FROM messages")
    public List<Message> findAll();

    @Select("SELECT * FROM messages WHERE messages_id = #{messages_id}")
    public List<Message> findByMessageId(String id);

    @Select("SELECT * FROM messages WHERE messages_send_users_id = #{messages_id}")
    public Message findBySenderId(String id);

    @Select("SELECT * FROM messages WHERE messages_receiverId = #{messages_id}")
    public List<Message> findByReceiverId(String id);

    @Delete("DELETE FROM messages WHERE messages_id = #{messages_id}")
    public int deleteByMessageId(String id);

    @Insert("INSERT IGNORE INTO messages(messages_id, messages_senderId, messages_senderName,messages_receiverId,messages_status, messages_type,messages_icon, messages_caption, messages_content, messages_URL, messages_setTime, messages_expireTime, messages_sendTime) " +
            " VALUES (#{messages_id}, #{messages_senderId}, #{messages_senderName}, #{messages_receiverId}, #{messages_status}, #{messages_type}, #{messages_icon}, #{messages_caption}, #{messages_content}, #{messages_URL}, #{messages_setTime}, #{messages_expireTime}, #{messages_sendTime})")
    public int insert(Message message);

    @Update("UPDATE messages set messages_status=#{messages_status} where messages_id=#{messages_id}")
    public int update(Message message);

    @Select("SELECT * FROM messages where messages_status ='1'")
    public List<Message> findActive();
}
