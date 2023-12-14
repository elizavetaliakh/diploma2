package com.diploma.customs.rest;

import com.diploma.customs.dto.UserDto;
import com.diploma.customs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    //@RequestMapping можно заменить на @GetMapping("get{id}")
    @RequestMapping(value = "get{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> getUser(@PathVariable("id") Long userId) {
        UserDto user = userService.getById(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //@RequestMapping можно заменить на @PostMapping("save")
    @RequestMapping(value = "save", method = RequestMethod.POST)
    public ResponseEntity<UserDto> saveUser(@RequestBody UserDto user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        user = userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    //@RequestMapping можно заменить на @PutMapping("update")
    @RequestMapping(value = "update", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto user, UriComponentsBuilder builder) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        user = userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //@RequestMapping можно заменить на @DeleteMapping("delete{id}")
    @RequestMapping(value = "delete{id}", method = RequestMethod.DELETE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> deleteUser(@PathVariable("id") Long id) {
        UserDto user = userService.getById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //@RequestMapping можно заменить на @GetMapping("all")
    @RequestMapping(value = "all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping(value = "table")
    public String getTable() {
        return "index";
    }
}
