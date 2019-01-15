package com.grokonez.jwtauthentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

import static javax.persistence.CascadeType.REMOVE;

@Entity
@Table(name = "comments")
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    private String description;
//    private Date date_publish_comment;
    private long likeCount;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;


    @OneToMany(cascade = REMOVE, mappedBy = "comment")
    private Set<Likes> likes;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "recipe_id")
    private Recipes recipe;




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Recipes getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipes recipe) {
        this.recipe = recipe;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

//    public Date getDate_publish_comment() {
//        return date_publish_comment;
//    }
//
//    public void setDate_publish_comment(Date date_publish_comment) {
//        this.date_publish_comment = date_publish_comment;
//    }

    public Set<Likes> getLikes() {
        return likes;
    }

    public void setLikes(Set<Likes> likes) {
        this.likes = likes;
    }

    public long getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(long likeCount) {
        this.likeCount = likeCount;
    }
}
