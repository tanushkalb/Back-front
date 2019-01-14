package com.grokonez.jwtauthentication.repository;

import com.grokonez.jwtauthentication.model.Comments;
import com.grokonez.jwtauthentication.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer>, Repository<Rating, Integer> {

    List<Rating> findAll();
    List<Rating> findAllByRecipeId(long id);
    List<Rating> findAllByUserId(long id);
    List<Rating> findByRecipeIdAndUserId(long rid, long uid);
    Rating findOneByRecipeIdAndUserId(long rid, long uid);
}
