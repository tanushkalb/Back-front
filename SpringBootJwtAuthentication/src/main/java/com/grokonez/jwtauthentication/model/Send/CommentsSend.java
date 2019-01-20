package com.grokonez.jwtauthentication.model.Send;

import com.grokonez.jwtauthentication.model.Comments;


public class CommentsSend extends Comments {


    public CommentsSend(Comments comments) {
        this.commentClick = comments.getCommentClick();
        this.id = comments.getId();
        this.description = comments.getDescription();
        this.likeCount = comments.getLikeCount();
        this.likes = comments.getLikes();
    }

    private Long isLike;

    private Long commentLike;

    public Long getIsLike() {
        return isLike;
    }

    public void setIsLike(Long isLike) {
        this.isLike = isLike;
    }

    public Long getCommentLike() {
        return commentLike;
    }

    public void setCommentLike(Long commentLike) {
        this.commentLike = commentLike;
    }
}
