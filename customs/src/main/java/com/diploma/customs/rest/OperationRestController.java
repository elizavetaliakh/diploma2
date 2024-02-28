package com.diploma.customs.rest;

import com.diploma.customs.dto.OperationDto;
import com.diploma.customs.service.OperationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/operations/")
@RequiredArgsConstructor
@Slf4j
public class OperationRestController {
    private final OperationService operationService;

    @GetMapping("get/{id}")
    public ResponseEntity<OperationDto> getOperation(@PathVariable("id") Long operationId) {
        if (operationId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        OperationDto operation = operationService.getById(operationId);
        if (operation == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(operation, HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<OperationDto> saveOperation(@RequestBody OperationDto operation) {
        if (operation == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        operation = operationService.save(operation);
        return new ResponseEntity<>(operation, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity<OperationDto> updateOperation(@RequestBody OperationDto operation, UriComponentsBuilder builder) {
        if (operation == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        operation = operationService.save(operation);
        return new ResponseEntity<>(operation, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<OperationDto> deleteOperation(@PathVariable("id") Long operationId) {
        OperationDto operation = operationService.getById(operationId);
        if (operation == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        operationService.delete(operationId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<OperationDto>> getAllOperations() {
        List<OperationDto> operations = operationService.getAll();
        if (operations.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(operations, HttpStatus.OK);
    }

    @GetMapping("sqlquery")
    public ResponseEntity<List<OperationDto>> getSqlResults() {
        List<OperationDto> list = operationService.selectOperations();
        if (list.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("setsqlquery")
    public ResponseEntity<List<OperationDto>> getOperationsByQuery() {
        List<OperationDto> list = operationService.getOperationsByQuery("SELECT o FROM Operation o");
        if (list.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("getcolumns")
    public ResponseEntity<Integer> getColumns(String catalog, String table) {
        int columns = operationService.countColumns(catalog, table);
        if (columns == 0) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(columns, HttpStatus.OK);
    }

    @GetMapping("getrows")
    public ResponseEntity<Integer> getRowsOperations() {
        int rows = operationService.countRowsOperations();
        if (rows == 0) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(rows, HttpStatus.OK);
    }

    @GetMapping("getcolumnsnames")
    public ResponseEntity<List<String>> getColumnsNames(String catalog, String table) {
        List<String> list = operationService.selectColumns(catalog, table);
        if (list.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("getcolumndatatype")
    public ResponseEntity<String> getColumnDataType(String catalog, String table, String column) {
        String dataType = operationService.getColumnDataType(catalog, table, column);
        if (dataType == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(dataType, HttpStatus.OK);
    }

    @GetMapping("ownquery")
    public ResponseEntity<List<OperationDto>> getOwnQueryOperations(String query) {
        List<OperationDto> list = operationService.ownQueryOperations(query);
        if (list.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
