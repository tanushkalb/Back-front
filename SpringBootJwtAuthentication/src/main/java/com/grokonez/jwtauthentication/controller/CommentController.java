package com.grokonez.jwtauthentication.controller;

import com.grokonez.jwtauthentication.model.Comments;
import com.grokonez.jwtauthentication.model.Recipes;
import com.grokonez.jwtauthentication.model.User;
import com.grokonez.jwtauthentication.repository.CommentRepository;
import com.grokonez.jwtauthentication.repository.RecipesRepository;
import com.grokonez.jwtauthentication.repository.UserRepository;
import com.grokonez.jwtauthentication.security.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.xml.stream.events.Comment;
import java.util.Date;
import java.util.List;
import java.util.PrimitiveIterator;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("/comment")
public class CommentController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipesRepository recipesRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private LikeService likeService;

    @GetMapping("*/Comment/Commentbyrecept/{comid}")
    public List<Comments> findCommentById(@PathVariable("comid") long id) {
        return commentRepository.findAllByRecipeId(id);
    }

    @GetMapping("*/comment")
    public List getComments() {
        return commentRepository.findAll();
    }

    @GetMapping("*/count/{commentId}")
    public Comments getCountLike(@PathVariable("commentId") long id ) {
        Comments comment = commentRepository.findById(id).get();
        comment.setLikeCount(likeService.calcCountLikes(comment.getId()));
        return commentRepository.save(comment);
    }

    @PostMapping("*/Comment/{userId}/Recipe/{commentId}")
    public Comments createComment(@PathVariable("userId") long id,@PathVariable("commentId") long comId, @RequestBody Comments comments) {
        User persona = userRepository.findById(id).get();
        Recipes recipe = recipesRepository.findById(comId).get();
        comments.setUser(persona);
        comments.setRecipe(recipe);
//        comments.setDate_publish_comment(new Date());
        return commentRepository.save(comments);
    }
}