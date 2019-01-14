package com.grokonez.jwtauthentication.ServiceImpl;

import com.grokonez.jwtauthentication.model.Rating;
import com.grokonez.jwtauthentication.repository.RatingRepository;
import com.grokonez.jwtauthentication.security.services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    RatingRepository ratingRepository;

    @Override
    public double calcAverageRating(long ratingId) {
        List<Rating> allRatings=ratingRepository.findAllByRecipeId(ratingId);
        double sum=0;
        for(Rating rt: allRatings) {
            sum+=rt.getRating();
        }
        double average=sum/( allRatings.size() );
        return average;
    }
}
