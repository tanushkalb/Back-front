package com.grokonez.jwtauthentication.controller;


import com.grokonez.jwtauthentication.repository.IngredientReposirory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("/ingredient")
public class IngredientController {

    @Autowired
    IngredientReposirory ingredientReposirory;

    @GetMapping("*/all")
    public List findAllRecipes() {
        return ingredientReposirory.findAll();
    }
}
