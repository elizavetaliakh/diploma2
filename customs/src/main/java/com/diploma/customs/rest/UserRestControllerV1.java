package com.diploma.customs.rest;

import com.diploma.customs.dto.UserDto;
import com.diploma.customs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Controller
@RestController
@RequestMapping("/api/v1/users/")
@RequiredArgsConstructor
public class UserRestControllerV1 {
    private final UserService userService;

    @GetMapping("get/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Long userId) {
        if (userId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        UserDto user = userService.getById(userId);
        if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<UserDto> saveUser(@RequestBody UserDto user) {
        if (user == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        user = userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto user, UriComponentsBuilder builder) {
        if (user == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        user = userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<UserDto> deleteUser(@PathVariable("id") Long id) {
        UserDto user = userService.getById(id);
        if (user == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAll();
        if (users.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(value = "table")
    public String getTable() {
        return "index";
    }
}
