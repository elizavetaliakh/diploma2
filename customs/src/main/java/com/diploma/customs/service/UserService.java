package com.diploma.customs.service;

import com.diploma.customs.dto.UserDto;
import com.diploma.customs.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDto getById(Long id);
    UserDto save(UserDto user);
    void delete(Long id);
    List<UserDto> getAll();
}
