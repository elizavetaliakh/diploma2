package com.diploma.customs.mapper;

import com.diploma.customs.dto.UserDto;
import com.diploma.customs.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends DefaultEntityMapper<User, UserDto> {
}
