package com.grokonez.jwtauthentication.ServiceImpl;


import com.grokonez.jwtauthentication.model.Likes;
import com.grokonez.jwtauthentication.repository.LikeRepository;
import com.grokonez.jwtauthentication.security.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Override
    public long calcCountLikes(long commentId) {
        List<Likes> allLikes=likeRepository.findAllByCommentId(commentId);
        long sum=0;
        for(Likes rt: allLikes) {
            sum+=rt.getClick();
        }
        return sum;

    }
}
