package com.grokonez.jwtauthentication.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.grokonez.jwtauthentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.grokonez.jwtauthentication.model.Role;
import com.grokonez.jwtauthentication.model.RoleName;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);

    List<Role> findByUsers(Set<User> users);

}