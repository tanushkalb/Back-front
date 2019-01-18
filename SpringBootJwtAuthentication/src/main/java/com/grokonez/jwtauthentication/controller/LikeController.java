package com.grokonez.jwtauthentication.controller;

import com.grokonez.jwtauthentication.model.*;
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

    @GetMapping("*/alllike")
    public List getLike(){
        return likeRepository.findAll();
    }

    @GetMapping("*/commentId/{id}")
    public List <Likes> getLikeByCommentId(@PathVariable("id") long id ){
        return likeRepository.findAllByCommentId(id);
    }

    @GetMapping("*/userId/commentId/{id}/{comId}")
    public List<Likes> getLikeByUserIdAndCommentId(@PathVariable("id") long id, @PathVariable("comId") long comId){
        return likeRepository.findByCommentIdAndUserId(comId, id);
    }

    @PostMapping("*/user/{userId}/comment/{commentId}")
    public Likes createLike(@PathVariable("userId") long id, @PathVariable("commentId") long comId, @RequestBody Likes like) {
        User persona = userRepository.findById(id).get();
        Comments comment = commentRepository.findById(comId).get();
        like.setUser(persona);
        like.setComment(comment);
        return likeRepository.save(like);
    }

    @PutMapping("*/user/{userId}/comment/{commentId}")
    public Likes updateRating(@PathVariable("userId") long id, @PathVariable("commentId") long comId, @RequestBody Likes likes) {
       Likes updateLikes = likeRepository.findOneByCommentIdAndUserId(comId, id);
        updateLikes.setClick(likes.getClick());
        return likeRepository.save(updateLikes);
    }

}
