//package com.grokonez.jwtauthentication.model;
//
//
//import javax.persistence.*;
//import java.util.Set;
//
//@Entity
//@Table(name = "ingredients")
//public class Ingredients {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    public Long id;
//    private String ingredients;
//
//    @ManyToMany()
//    @JoinTable
//    private Set<Recipes> recipes;
//
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getIngredients() {
//        return ingredients;
//    }
//
//    public void setIngredients(String ingredients) {
//        this.ingredients = ingredients;
//    }
//
//    public Set<Recipes> getRecipes() {
//        return recipes;
//    }
//
//    public void setRecipes(Set<Recipes> recipes) {
//        this.recipes = recipes;
//    }
//}
