package com.example.kkdemo_version1.Mappers;

import com.example.kkdemo_version1.Model.User;
import org.apache.ibatis.annotations.*;
import org.springframework.context.annotation.Bean;

import java.util.List;

/*
users
		long	string		string		string 		string
		users_id	users_username	users_first_name	users_last_name	users_email_address
* */

@Mapper
public interface UserMybatisRepository {

    @Select("SELECT * FROM users")
    public List<User> findAll();

    @Select("SELECT * FROM users WHERE users_id = #{id}")
    public User findById(String id);


    @Select("SELECT * FROM users WHERE users_emailAddress = #{email}")
    public User findByEmail(String email);

    @Delete("DELETE FROM users WHERE users_id = #{id}")
    public int deleteById(String id);

    @Insert("INSERT INTO users(users_id, users_username, users_firstName, users_lastName, users_userAvatar, users_emailAddress) " +
            " VALUES (#{users_id}, #{users_username}, #{users_firstName}, #{users_lastName}, #{users_userAvatar}, #{users_emailAddress})")
    public int insert(User user);

    @Update("UPDATE users set users_device_token=#{users_device_token} where users_id=#{users_id}")
    public int updateDeviceToken(User user);

    @Update("UPDATE users set users_username=#{users_username}, " +
            " users_firstName=#{users_firstName},users_lastName=#{users_lastName}, users_userAvatar=#{users_userAvatar}, users_emailAddress=#{users_emailAddress} where users_id=#{users_id}")
    public int update(User user);
}
