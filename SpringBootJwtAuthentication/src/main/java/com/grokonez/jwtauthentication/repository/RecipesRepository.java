package com.grokonez.jwtauthentication.repository;


import com.grokonez.jwtauthentication.model.Recipes;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.List;
import java.util.Optional;

public interface RecipesRepository extends JpaRepository<Recipes, Long>, Repository<Recipes, Long> {

    List<Recipes> findAllByUserId(long id);
    //Recipes findOne(long id);
}
