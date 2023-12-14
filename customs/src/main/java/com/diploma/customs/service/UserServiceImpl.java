package com.diploma.customs.service;

import com.diploma.customs.dto.UserDto;
import com.diploma.customs.mapper.UserMapper;
import com.diploma.customs.model.User;
import com.diploma.customs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper; //маппер нужен для конвертации сущности в dto и наоборот, т.к. не принято на интерфейсе работать напрямую с сущностью из БД

    @Override
    @Transactional(readOnly = true) //@Transactional(readOnly = true) используется в методах, которые читают данные из БД
    public UserDto getById(Long id) {
        return userMapper.toDto(userRepository.findById(id).orElse(null));
    }

    @Override
    @Transactional //@Transactional используется в методах, которые вносят изменения в БД
    public UserDto save(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        user = userRepository.save(user); //после сохранения в первый раз сущности присваивается id,
                                         //для отображения лучше передавать финальный результат после сохранения
        return userMapper.toDto(user);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getAll() {
        return userMapper.toListDto(userRepository.findAll());
    }
}
