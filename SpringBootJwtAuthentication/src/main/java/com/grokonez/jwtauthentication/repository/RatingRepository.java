package com.grokonez.jwtauthentication.repository;

import com.grokonez.jwtauthentication.model.Comments;
import com.grokonez.jwtauthentication.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer>, Repository<Rating, Integer> {

    List<Rating> findAllByRecipeId(long id);
}
