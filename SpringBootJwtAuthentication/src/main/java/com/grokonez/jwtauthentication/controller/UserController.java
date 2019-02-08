package com.grokonez.jwtauthentication.controller;


import com.grokonez.jwtauthentication.model.Role;
import com.grokonez.jwtauthentication.model.User;
import com.grokonez.jwtauthentication.repository.RoleRepository;
import com.grokonez.jwtauthentication.repository.UserRepository;
import com.grokonez.jwtauthentication.security.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.jws.soap.SOAPBinding;
import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserService userService;

    @GetMapping("*/carrentuser/{id}")
    public User findCarrentUser(@PathVariable("id") long id) {
        return userRepository.findById(id).get();
    }

    @GetMapping("*/alluser")
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @PutMapping("*/carrentuser/{id}")
    public User updateUser(@PathVariable("id") long id, @RequestBody User user) {
//        User persona = userRepository.findById(id).get();
//        persona.setTheme(user.getTheme());
//        persona.setLang(user.getLang());
        return userRepository.save(user);
    }

    @GetMapping("*/roleByUser")
    public List<Role> findRoleByUser(@RequestBody Set<User> users) {
        return roleRepository.findByUsers(users);
    }


//    @DeleteMapping("*/deleteusers")
//    public void deleteUsers(@RequestBody List<User> users) {
//        userRepository.deleteAll(users);
//    }

    @PostMapping("*/deleteoneusers")
    public List<User> deleteUsers(@RequestBody List<User> users) {
        userService.deleteUsers(users);
        return userRepository.findAll();
    }

}
