package com.example.kkdemo_version1.Mappers;

import com.example.kkdemo_version1.Model.Relation;
import org.apache.ibatis.annotations.*;

import java.util.List;

/*
relations
		primary key(relations_first_id, relations_second_id)
		long		long		int
		relations_first_id	relations_second_id	relations_type
		refers to users_id	refers to users_id
* */
@Mapper
public interface RelationMybatisRepository {
    @Select("SELECT * FROM relations")
    public List<Relation> findAll();

    @Select("SELECT * FROM relations WHERE relations_first_id = #{id}")
    public List<Relation> findByFirstId(String id);

    @Select("SELECT * FROM relations WHERE relations_first_id = #{first_id} and relations_second_id = #{second_id}")
    public List<Relation> findByBothId(String first_id,String second_id);

    @Delete("DELETE FROM relations WHERE relations_first_id = #{id} OR relations_second_id = #{id}")
    public int deleteById(long id);

    @Insert("INSERT INTO relations(relations_first_id, relations_second_id,relations_avatar,relations_second_name, relations_type) " +
            " VALUES (#{relations_first_id}, #{relations_second_id},#{relations_avatar},#{relations_second_name}, #{relations_type})")
    public int insert(Relation relation);

    @Update("UPDATE users set relations_type=#{username}, WHERE relations_first_id = #{firstId} OR relations_second_id = #{secondId}")
    public int update(Relation relation);
}
