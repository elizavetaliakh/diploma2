package com.diploma.customs.service;

import com.diploma.customs.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto getByUserName(String login);

    UserDto getById(Long id);

    UserDto save(UserDto user);

    void delete(Long id);

    List<UserDto> getAll();

}
