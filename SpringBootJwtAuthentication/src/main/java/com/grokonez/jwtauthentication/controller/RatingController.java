package com.grokonez.jwtauthentication.controller;

import com.grokonez.jwtauthentication.model.*;
import com.grokonez.jwtauthentication.repository.RatingRepository;
import com.grokonez.jwtauthentication.repository.RecipesRepository;
import com.grokonez.jwtauthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("/rating")
public class RatingController {

    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecipesRepository recipesRepository;

    @GetMapping("*/ratingId/{id}")
    public List<Rating> getRatingById(@PathVariable("id") long id ){
        return ratingRepository.findAllByRecipeId(id);
    }

    @PostMapping("*/user/{userId}/recipe/{recipeId}")
    public Rating createRating(@PathVariable("userId") long id, @PathVariable("recipeId") long recId, @RequestBody Rating rating) {
        User persona = userRepository.findById(id).get();
        Recipes recipes = recipesRepository.findById(recId).get();
        rating.setUser(persona);
        rating.setRecipe(recipes);
        return ratingRepository.save(rating);
    }

}
