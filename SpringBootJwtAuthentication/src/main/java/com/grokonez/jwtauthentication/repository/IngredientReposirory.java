package com.grokonez.jwtauthentication.repository;

import com.grokonez.jwtauthentication.model.Ingredients;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IngredientReposirory extends JpaRepository<Ingredients, Long> {
    Optional<Ingredients> findByName(String name);
}
