package com.grokonez.jwtauthentication;

import com.grokonez.jwtauthentication.model.Recipes;

public interface RecipesService {
    Recipes findById(long id);
}
