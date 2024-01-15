package com.diploma.customs.service;

import com.diploma.customs.dto.QueryDto;
import com.diploma.customs.mapper.QueryMapper;
import com.diploma.customs.model.Query;
import com.diploma.customs.repository.QueryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QueryServiceImpl implements QueryService{
    private final QueryRepository queryRepository;
    private final QueryMapper queryMapper;

    @Override
    @Transactional(readOnly = true)
    public QueryDto getById(Long queryId) {
        return queryMapper.toDto(queryRepository.findById(queryId).orElse(null));
    }

    @Override
    @Transactional
    public QueryDto save(QueryDto queryDto) {
        Query query = queryMapper.toEntity(queryDto);
        query = queryRepository.save(query);
        return queryMapper.toDto(query);
    }

    @Override
    @Transactional
    public void delete(Long queryId) {
        queryRepository.deleteById(queryId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QueryDto> getAll() {
        return queryMapper.toListDto(queryRepository.findAll());
    }
}
