package com.diploma.customs.service;

import com.diploma.customs.dto.QueryDto;

import java.util.List;

public interface QueryService {
    QueryDto getById(Long queryId);

    QueryDto save(QueryDto query);

    void delete(Long queryId);

    List<QueryDto> getAll();
}
