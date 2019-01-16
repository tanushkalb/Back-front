package com.grokonez.jwtauthentication.ServiceImpl;

import com.grokonez.jwtauthentication.model.Ingredients;
import com.grokonez.jwtauthentication.model.Recipes;
import com.grokonez.jwtauthentication.repository.IngredientReposirory;
import com.grokonez.jwtauthentication.repository.RecipesRepository;
import com.grokonez.jwtauthentication.security.services.RecipeService;
import jdk.nashorn.internal.ir.Optimistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class RecipeServiceImpl implements RecipeService {

    @Autowired
    RecipesRepository recipesRepository;
    @Autowired
    IngredientReposirory ingredientReposirory;

    @Override
    public Recipes save(Recipes recipes) {

        Set<Ingredients> ingredientsAll = new HashSet<>();

        for(Ingredients ingredients : recipes.getIngredients()){
            Optional<Ingredients> Optionalingredient = ingredientReposirory.findByName(ingredients.getName());
            Ingredients ingredient;
            if(Optionalingredient.isPresent()){

                ingredient = ingredientReposirory.save(Optionalingredient.get());
            }
            else {
                ingredient = ingredients;
            }
            ingredientsAll.add(ingredient);
        }
        recipes.setIngredients(ingredientsAll);
        return recipesRepository.save(recipes);
    }
}
