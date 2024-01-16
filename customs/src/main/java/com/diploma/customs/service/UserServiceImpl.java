package com.diploma.customs.service;

import com.diploma.customs.dto.UserDto;
import com.diploma.customs.mapper.UserMapper;
import com.diploma.customs.model.User;
import com.diploma.customs.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public UserDto getById(Long id) {
        return userMapper.toDto(userRepository.findById(id).orElse(null));
    }

    @Override
    @Transactional
    public UserDto save(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        user.setUserPassword(new BCryptPasswordEncoder().encode(user.getUserPassword()));
        user = userRepository.save(user);
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

    @Override
    @Transactional(readOnly = true)
    public UserDto getByUserName(String login) {
        return userMapper.toDto(userRepository.findByUserName(login).orElse(null));
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = getByUserName(username);

        if (user != null) {
            List<GrantedAuthority> roles = new ArrayList<>();
            roles.add(new SimpleGrantedAuthority(user.getUserRole().replace("ROLE_", "")));
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(),
                    user.getUserPassword(),
                    true, true, true, true,
                    roles
            );

        } else {
            throw new UsernameNotFoundException("No user with username '" + username + "' found!");
        }
    }
}
