package com.grokonez.jwtauthentication.security.services;


import com.grokonez.jwtauthentication.model.Comments;
import com.grokonez.jwtauthentication.model.Likes;
import com.grokonez.jwtauthentication.model.Recipes;
import com.grokonez.jwtauthentication.model.Send.CommentsSend;
import com.grokonez.jwtauthentication.repository.CommentRepository;
import com.grokonez.jwtauthentication.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentService {

    @Autowired
            private CommentRepository commentRepository;

    @Autowired
            private LikeService likeService;
    @Autowired
    private LikeRepository likeRepository;

   public List<CommentsSend> getByRecipeIdAndUserId(Long recipeid, Long userid) {
        List<Comments> comments = commentRepository.findAllByRecipeId(recipeid);
        List<CommentsSend> send = new ArrayList<>();
        for (Comments item : comments) {
            CommentsSend commentsSend = new CommentsSend(item);
            commentsSend.setLikeCount(likeService.calcCountLikes(commentsSend.getId()));
            List<Likes> likes = likeRepository.findByCommentIdAndUserId(commentsSend.getId(), userid);
            if(likes.size()>0) {
                Likes like = likeRepository.findByCommentIdAndUserId(commentsSend.getId(), userid).get(0);
                commentsSend.setIsLike(like.getClick());
            }
            else {
                commentsSend.setIsLike(0L);
            }


            send.add(commentsSend);
        }
        return send;
    }
}
