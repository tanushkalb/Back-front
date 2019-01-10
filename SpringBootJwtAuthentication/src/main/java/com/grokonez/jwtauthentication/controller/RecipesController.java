package com.grokonez.jwtauthentication.controller;


import com.grokonez.jwtauthentication.model.Recipes;
import com.grokonez.jwtauthentication.model.User;
import com.grokonez.jwtauthentication.repository.RecipesRepository;
import com.grokonez.jwtauthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("/recipes")
public class RecipesController {

    @Autowired
    private RecipesRepository recipesRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List findAllRecipes() {
        return recipesRepository.findAll();
    }

    @GetMapping("*/{id}")
    public Optional<Recipes> findOne(@PathVariable("id") long id) {
        return recipesRepository.findById(id);
    }

    @PostMapping("*/{userId}")
    public Recipes createRecipe(@PathVariable("userId") long id, @RequestBody Recipes recipes) {
        User persona = userRepository.findById(id).get();
        recipes.setUser(persona);
        return recipesRepository.save(recipes);
    }

//    @PostMapping("*/user/{userId}")
//    public User postUserInfo(@PathVariable("userId") long id, @RequestBody User user) {
//        User persona = userRepository.findById(id).get();
//        return userRepository.save(persona);
//    }

    @GetMapping("*/user/{id}")
    public List<Recipes> findAll(@PathVariable("id") long id) {
        return recipesRepository.findAllByUserId(id);
    }

    @PutMapping("*/{id}")
    public Recipes updateRecipe(@RequestBody Recipes recipes, @PathVariable("id") long id) {
        User persona = userRepository.findById(id).get();
        recipes.setUser(persona);
        return recipesRepository.save(recipes);
    }


    @DeleteMapping("*/{id}")
    public void deleteRecipe(@PathVariable("id") long id) {
        recipesRepository.deleteById(id);
    }

}
