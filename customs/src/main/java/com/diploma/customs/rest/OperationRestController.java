package com.diploma.customs.rest;

import com.diploma.customs.dto.OperationDto;
import com.diploma.customs.dto.QueryDto;
import com.diploma.customs.dto.UserDto;
import com.diploma.customs.model.Operation;
import com.diploma.customs.service.OperationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
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

//    @GetMapping("datequery")
//    public int countByDate(@RequestBody String table, @RequestBody String dateField, @RequestBody LocalDate dateFrom,
//                           @RequestBody LocalDate dateTo, @RequestBody String pieField, @RequestBody String sliceValue) {
//        int count = operationService.getByDateQuery(table, dateField, dateFrom, dateTo, pieField, sliceValue);
//        return count;
//    }
//
//    @GetMapping("conditionquery")
//    public int countByCondition(@RequestBody String table, @RequestBody String conditionField, @RequestBody String condition,
//                                 @RequestBody String pieField, @RequestBody String sliceValue) {
//        int count = operationService.getByConditionQuery(table,conditionField,condition,pieField,sliceValue);
//        return count;
//    }
//
//    @GetMapping("dateconditionquery")
//    public int countByDateCondition(@RequestBody String table, @RequestBody String dateField, @RequestBody LocalDate dateFrom,
//                                    @RequestBody LocalDate dateTo, @RequestBody String conditionField, @RequestBody String condition,
//                                 @RequestBody String pieField, @RequestBody String sliceValue) {
//        int count = operationService.getByDateAndConditionQuery(table,dateField,dateFrom,dateTo,
//                conditionField,condition,pieField,sliceValue);
//        return count;
//    }
//
//    @GetMapping("values")
//    public List<String> getValues(@RequestBody String field, @RequestBody String table) {
//        List<String> list = operationService.getValues(field,table);
//        return list;
//    }

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
}
