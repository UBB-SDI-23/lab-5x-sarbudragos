package com.example.sdilab1.service;

import com.example.sdilab1.model.User;
import com.example.sdilab1.model.UserDTO;
import com.example.sdilab1.model.UserProfile;
import com.example.sdilab1.repository.UserProfileRepository;
import com.example.sdilab1.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final UserProfileRepository userProfileRepository;

    public UserDTO getById(Integer id){
        return userRepository.findById(id).map(UserDTO::fromUser).orElseThrow();
    }

    public UserDTO getByUserName(String userName){
        return userRepository.findUserByUsername(userName).map(UserDTO::fromUser).orElseThrow();
    }

    public void setUserProfile(UserProfile userProfile, Integer userId) throws Exception {
        User user = userRepository.findById(userId).orElseThrow();

        if(userProfile.getBio().isBlank()){
            throw new Exception("User bio can not be blank.");
        }
        else if (userProfile.getGender().isBlank()){
            throw new Exception("User gender can not be blank.");
        }
        else if (userProfile.getMaritalStatus().isBlank()){
            throw new Exception("User marital status can not be blank.");
        }

        user.setUserProfile(userProfile);
        userProfile.setUser(user);

        userRepository.save(user);
        userProfileRepository.save(userProfile);
    }

    public void setItemsPerPage(Integer newItemsPerPage, Integer userId) {
        User user = userRepository.findById(userId).orElseThrow();

        user.setItemsPerPage(newItemsPerPage);

        userRepository.save(user);
    }
}
