package com.diploma.customs.service;

import com.diploma.customs.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User getById(Long id);
    void save(User user);
    void delete(Long id);
    List<User> getAll();
}
