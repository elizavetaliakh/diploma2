package com.diploma.customs.rest;

import com.diploma.customs.dto.QueryDto;
import com.diploma.customs.dto.UserDto;
import com.diploma.customs.service.QueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Controller
@RestController
@RequestMapping("/api/queries/")
@RequiredArgsConstructor
public class QueryRestController {
    private final QueryService queryService;

    @GetMapping("get/{id}")
    public ResponseEntity<QueryDto> getQuery(@PathVariable("id") Long queryId) {
        if (queryId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        QueryDto query = queryService.getById(queryId);
        if (query == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(query, HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<QueryDto> saveQuery(@RequestBody QueryDto query) {
        if (query == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        query = queryService.save(query);
        return new ResponseEntity<>(query, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity<QueryDto> updateQuery(@RequestBody QueryDto query, UriComponentsBuilder builder) {
        if (query == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        query = queryService.save(query);
        return new ResponseEntity<>(query, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<QueryDto> deleteQuery(@PathVariable("id") Long queryId) {
        QueryDto query = queryService.getById(queryId);
        if (query == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        queryService.delete(queryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<QueryDto>> getAllQueries() {
        List<QueryDto> queries = queryService.getAll();
        if (queries.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(queries, HttpStatus.OK);
    }
}
