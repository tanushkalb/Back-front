package com.grokonez.jwtauthentication.repository;

import com.grokonez.jwtauthentication.model.Likes;
import com.grokonez.jwtauthentication.model.Rating;
import com.grokonez.jwtauthentication.model.Recipes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Likes, Long> {
    List<Likes> findAllByCommentId(long id);
    List<Likes> findByCommentIdAndUserId(long cid, long uid);
    Likes findOneByCommentIdAndUserId(long cid, long uid);
    List<Likes> findAllByComment_RecipeIdAndUserId(long recipeid, long userid);
}
