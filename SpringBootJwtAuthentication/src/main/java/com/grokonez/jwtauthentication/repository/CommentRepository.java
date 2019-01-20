package com.grokonez.jwtauthentication.repository;

import com.grokonez.jwtauthentication.model.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comments, Long>, Repository<Comments, Long> {
    List<Comments> findAllByRecipeId(long id);

}
