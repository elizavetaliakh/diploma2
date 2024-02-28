package com.diploma.customs.service;


import com.diploma.customs.dto.OperationDto;

import java.time.LocalDate;
import java.util.List;

public interface OperationService { ;
    OperationDto getById(Long id);
    OperationDto save(OperationDto user);
    void delete(Long id);
    List<OperationDto> getAll();
    List<OperationDto> selectOperations();
    List<OperationDto> getOperationsByQuery(String query);
    Integer countColumns(String catalog, String table);
    Integer countRowsOperations();
    List<String> selectColumns(String catalog, String table);
    String getColumnDataType(String catalog, String table, String column);

    List<OperationDto> ownQueryOperations(String query);
}
