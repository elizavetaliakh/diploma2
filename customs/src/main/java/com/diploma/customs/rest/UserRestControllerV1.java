package com.diploma.customs.rest;

import com.diploma.customs.model.User;
import com.diploma.customs.service.UserService;
import com.diploma.customs.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Optional;

@Controller
@RestController
@RequestMapping("/api/v1/users/")
public class UserRestControllerV1 {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "get{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> getUser(@PathVariable("id") Long userId){
        if(userId==null) {
            return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
        }

        User user = this.userService.getById(userId);

        if(user==null) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "save", method = RequestMethod.POST)
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        HttpHeaders headers = new HttpHeaders();
        if(user==null) {
            return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
        }

        this.userService.save(user);
        return new ResponseEntity<User>(user, headers, HttpStatus.CREATED);
    }

    @RequestMapping(value = "update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> updateUser(@RequestBody User user, UriComponentsBuilder builder) {
        HttpHeaders headers = new HttpHeaders();
        if(user==null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        this.userService.save(user);
        return new ResponseEntity<>(user, headers, HttpStatus.OK);
    }

    @RequestMapping(value = "delete{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {
        User user = this.userService.getById(id);
        if(user==null) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        this.userService.delete(id);
        return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = this.userService.getAll();
        if(users.isEmpty()) {
            return new ResponseEntity<List<User>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(value = "table")
    public String getTable() {
        return "index";
    }
}
