package com.example.kkdemo_version1.Mappers;

import com.example.kkdemo_version1.Model.Account;
import org.apache.ibatis.annotations.*;

import java.util.List;

/*
accounts
		long		long		string			string		int
		account_id	accounts_users_id	accounts_email_address	accounts_password	accounts_status
				refers to users_id
* */
public interface AccountMybatisRepository {

    @Select("SELECT * FROM accounts")
    public List<Account> findAll();

    @Select("SELECT * FROM accounts WHERE account_id = #{id}")
    public Account findById(long id);

    @Delete("DELETE FROM accounts WHERE account_id = #{id}")
    public int deleteById(long id);

    @Insert("INSERT INTO accounts(account_id,accounts_users_id, accounts_email_address, accounts_password,accounts_status) " +
            " VALUES (#{id}, #{userId}, #{emailAddress}, #{password}, #{status})")
    public int insert(Account user);

    @Update("UPDATE accounts set accounts_email_address=#{emailAddress} where account_id=#{id}")
    public int updateEmail(Account user);

    @Update("UPDATE accounts set accounts_password=#{password} where account_id=#{id}")
    public int updatePassword(Account user);
}
