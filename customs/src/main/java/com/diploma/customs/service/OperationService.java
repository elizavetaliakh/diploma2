package com.diploma.customs.service;


import com.diploma.customs.dto.OperationDto;
import com.diploma.customs.model.Operation;

import java.time.LocalDate;
import java.util.List;

public interface OperationService { ;
    OperationDto getById(Long id);
    OperationDto save(OperationDto user);
    void delete(Long id);
    List<OperationDto> getAll();
    //    int getByDateQuery(String table, String dateField, LocalDate dateFrom, LocalDate dateTo, String pieField, String sliceValue);
//    int getByConditionQuery(String table, String conditionField, String condition, String pieField, String sliceValue);
//    int getByDateAndConditionQuery(String table, String dateField, LocalDate dateFrom, LocalDate dateTo,
//                                    String conditionField, String condition, String pieField, String sliceValue);
//    List<String> getValues(String field, String table);
    List<OperationDto> selectOperations();
    List<OperationDto> getOperationsByQuery(String query);
    Integer countColumns(String catalog, String table);
    Integer countRowsOperations();
    List<String> selectColumns(String catalog, String table);
}
