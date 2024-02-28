package com.diploma.customs.rest;

import com.diploma.customs.dto.UserDto;
import com.diploma.customs.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/v1/users/")
@RequiredArgsConstructor
@Slf4j
public class UserRestControllerV1 {
    private final UserService userService;

    @GetMapping("get/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Long userId) {
        log.info("getUser");
        if (userId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        UserDto user = userService.getById(userId);
        if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<UserDto> saveUser(@RequestBody UserDto user) {
        log.info("saveUser");
        if (user == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        user = userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto user, UriComponentsBuilder builder) {
        log.info("updateUser");
        if (user == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        user = userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable("id") Long userId) {
        log.info("deleteUser");
        UserDto user = userService.getById(userId);
        if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        userService.delete(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        log.info("getAllUsers");
        List<UserDto> users = userService.getAll();
        if (users.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("login/{log}/{password}")
    public ResponseEntity<UserDto> loginUser(@PathVariable("log") String userName, @PathVariable("password") String userPassword) {
        log.info("loginUser");
        if (userName == null || userPassword == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        UserDto user = userService.getByUserName(userName);
        if (user != null && Objects.equals(user.getUserPassword(), userPassword))
            return new ResponseEntity<>(user, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "table")
    public String getTable() {
        log.info("getUsTable");
        return "index";
    }
}
