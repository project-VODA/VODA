package com.voda.calling.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "user_pass")
    private String userPass;
    @Column(name = "user_name")
    private String userName;
    @Column(name = "user_token")
    private String userToken;
    @Column(name = "user_handicap")
    private int userHandicap;
    @Column(name = "user_cancel")
    private int userCancel;
    @Column(name = "user_regtime")
    private String userRegTime;

}
