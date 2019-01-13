package com.grokonez.jwtauthentication.controller;

import com.grokonez.jwtauthentication.model.Comments;
import com.grokonez.jwtauthentication.model.Likes;
import com.grokonez.jwtauthentication.model.Recipes;
import com.grokonez.jwtauthentication.model.User;
import com.grokonez.jwtauthentication.repository.CommentRepository;
import com.grokonez.jwtauthentication.repository.LikeRepository;
import com.grokonez.jwtauthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("/like")
public class LikeController {

    @Autowired
    LikeRepository likeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CommentRepository commentRepository;

//    @GetMapping()
//    public List getLike(){
//        return likeRepository.findAll();
//    }

    @GetMapping("/commentId/{id}")
    public List <Likes> getLikeById(@PathVariable("id") long id ){
        return likeRepository.findAllByCommentId(id);
    }

//    @PostMapping()
//    public Likes writeLike(@RequestBody Likes likes) {
//        return likeRepository.save(likes);
//    }

    @PostMapping("*/user/{userId}/comment/{commentId}")
    public Likes createLike(@PathVariable("userId") long id, @PathVariable("commentId") long comId, @RequestBody Likes like) {
        User persona = userRepository.findById(id).get();
        Comments comment = commentRepository.findById(comId).get();
        like.setUser(persona);
        like.setComment(comment);
        return likeRepository.save(like);
    }

}
