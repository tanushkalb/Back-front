package com.grokonez.jwtauthentication.controller;


import com.grokonez.jwtauthentication.model.User;
import com.grokonez.jwtauthentication.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("*/carrentuser/{id}")
    public User findCarrentUser(@PathVariable("id") long id) {
        return userRepository.findById(id).get();
    }

    @PutMapping("*/carrentuser/{id}")
    public User updateUser(@PathVariable("id") long id, @RequestBody User user) {
        User persona = userRepository.findById(id).get();
        persona.setTheme(user.getTheme());
        persona.setLang(user.getLang());
        return userRepository.save(persona);
    }

    //@PostMapping("/get")
}
