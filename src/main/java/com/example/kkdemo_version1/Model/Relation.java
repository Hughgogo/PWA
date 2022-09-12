package com.example.kkdemo_version1.Model;

public class Relation {

    // Two-way relation
    // First user id
    private String relations_first_id;
    // Second user id
    private String relations_second_id;
    // Relation status active,blocked,
    private String relations_type;

    private String relations_second_name;

    private String relations_avatar;

    // Constructor
    public void Relation(){

    }

    // region Getter Setter  ************************************************************

    public String getRelations_first_id() {
        return relations_first_id;
    }

    public void setRelations_first_id(String relations_first_id) {
        this.relations_first_id = relations_first_id;
    }

    public String getRelations_second_id() {
        return relations_second_id;
    }

    public void setRelations_second_id(String relations_second_id) {
        this.relations_second_id = relations_second_id;
    }

    public String getRelations_type() {
        return relations_type;
    }

    public void setRelations_type(String relations_type) {
        this.relations_type = relations_type;
    }

    public String getRelations_second_name() {
        return relations_second_name;
    }

    public void setRelations_second_name(String relations_second_name) {
        this.relations_second_name = relations_second_name;
    }

    public String getRelations_avatar() {
        return relations_avatar;
    }

    public void setRelations_avatar(String relations_avatar) {
        this.relations_avatar = relations_avatar;
    }

    // region End of Getter Setter  *****************************************************


}
