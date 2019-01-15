package com.grokonez.jwtauthentication.repository;


import com.grokonez.jwtauthentication.model.Recipes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface RecipesRepository extends JpaRepository<Recipes, Long>, Repository<Recipes, Long> {
    List<Recipes> findAllByUserId(long id);
    List<Recipes> findAllByOrderByAverageRatingDesc();
    List<Recipes> findAllByOrderByDateDesc();
}
