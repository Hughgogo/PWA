package com.example.kkdemo_version1.Mappers;

import com.example.kkdemo_version1.Model.Invitation;
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
public interface InvitationMybatisRepository {
    
    @Update("UPDATE invitations set invitations_status='1' where invitations_id=#{invitations_id}")
    public int updateStatusToConsent(String invitations_id);

    @Update("UPDATE invitations set invitations_status='2' where invitations_id=#{invitations_id}")
    public int updateStatusToDecline(String invitations_id);


    @Select("SELECT * FROM invitations WHERE invitations_receiverEmail = #{invitations_receiverEmail} AND invitations_senderId = #{invitations_senderId}")
    public List<Invitation> findByEmail(String invitations_receiverEmail,String invitations_senderId);

    @Select("SELECT * FROM invitations WHERE invitations_receiverEmail = #{invitations_receiverEmail}")
    public List<Invitation> findByReceiverEmail(String invitations_receiverEmail);

    @Select("SELECT * FROM invitations WHERE invitations_id = #{invitations_id}")
    public List<Invitation> findByID(String invitations_id);

    @Insert("INSERT IGNORE INTO invitations(invitations_id, invitations_senderId, invitations_senderName,invitations_icon,invitations_receiverEmail, invitations_status, invitations_type) " +
            " VALUES (#{invitations_id}, #{invitations_senderId}, #{invitations_senderName}, #{invitations_icon}, #{invitations_receiverEmail}, #{invitations_status}, #{invitations_type})")
    public int insert(Invitation invitation);

}
