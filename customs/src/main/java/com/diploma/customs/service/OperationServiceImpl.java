package com.diploma.customs.service;

import com.diploma.customs.dto.OperationDto;
import com.diploma.customs.dto.QueryDto;
import com.diploma.customs.dto.UserDto;
import com.diploma.customs.mapper.OperationMapper;
import com.diploma.customs.model.Operation;
import com.diploma.customs.repository.OperationRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Session;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.hibernate.query.Query;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OperationServiceImpl implements OperationService {
    private final OperationRepository operationRepository;
    private final OperationMapper operationMapper;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional(readOnly = true)
    public OperationDto getById(Long id) {
        return operationMapper.toDto(operationRepository.findById(id).orElse(null));
    }
    @Override
    @Transactional
    public OperationDto save(OperationDto operationDto) {
        Operation operation = operationMapper.toEntity(operationDto);
        operation = operationRepository.save(operation);
        return operationMapper.toDto(operation);
    }
    @Override
    @Transactional
    public void delete(Long operationId) {
        operationRepository.deleteById(operationId);
    }
    @Override
    @Transactional(readOnly = true)
    public List<OperationDto> getAll() {
        return operationMapper.toListDto(operationRepository.findAll());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OperationDto> selectOperations() {
        return operationMapper.toListDto(operationRepository.selectOperations());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OperationDto> getOperationsByQuery(String query) {
        return entityManager.createQuery(query, OperationDto.class).getResultList();
    }

    @Override
    @Transactional(readOnly = true)
    public Integer countColumns(String catalog, String table) {
        return operationRepository.getColumnsNumber(catalog, table);
    }

    @Override
    @Transactional(readOnly = true)
    public Integer countRowsOperations() {
        return operationRepository.getRowNumberOperations();
    }

    @Override
    @Transactional(readOnly = true)
    public List<String> selectColumns(String catalog, String table) {
        return operationRepository.selectColumns(catalog, table).stream().toList();
    }

    @Override
    @Transactional(readOnly = true)
    public String getColumnDataType(String catalog, String table, String column) {
        return operationRepository.getColumnDataType(catalog, table, column);
    }

    private Session currentSession() {
        return entityManager.unwrap(Session.class);
    }
    @Override
    @Transactional(readOnly = true)
    public List<OperationDto> ownQueryOperations(String query) {
        try (Session session = currentSession()) {
            Query<Operation> q = session.createNativeQuery(query, Operation.class);
            List<Operation> result = q.list();
            return (List<OperationDto>) operationMapper.toListDto(result);
        } catch (Exception exception) {
            log.error(exception.getMessage(), exception);
        }
        return null;
    }
}
