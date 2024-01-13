package com.diploma.customs.rest;

import com.diploma.customs.model.User;
import com.diploma.customs.service.UserService;
import com.diploma.customs.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/")
public class UserRestControllerV1 {
    private UserServiceImpl userService;

    @GetMapping("get/{id}")
    public ResponseEntity<User> getUser(@PathVariable("id") Long userId){
        if(userId==null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        User user = userService.getById(userId);
        if(user==null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        HttpHeaders headers = new HttpHeaders();
        if(user==null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        userService.save(user);
        return new ResponseEntity<>(user, headers, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity<User> updateUser(@RequestBody User user, UriComponentsBuilder builder) {
        HttpHeaders headers = new HttpHeaders();
        if(user==null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        userService.save(user);
        return new ResponseEntity<>(user, headers, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        User user = userService.getById(id);
        if(user==null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        userService.delete(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = this.userService.getAll();
        if(users.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(value = "table")
    public String getTable() {
        return "index";
    }
}
