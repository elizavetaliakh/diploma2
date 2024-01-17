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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.hibernate.query.Query;


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

//    @Override
//    @Transactional(readOnly = true)
//    public int getByDateQuery(String table, String dateField, LocalDate dateFrom, LocalDate dateTo, String pieField, String sliceValue) {
//        return operationRepository.findByDateQuery(table, dateField, dateFrom, dateTo, pieField, sliceValue);
//    }
//
//    @Override
//    @Transactional(readOnly = true)
//    public int getByConditionQuery(String table, String conditionField, String condition, String pieField, String sliceValue) {
//        return operationRepository.findByConditionQuery(table, conditionField, condition, pieField, sliceValue);
//    }
//
//    @Override
//    @Transactional(readOnly = true)
//    public int getByDateAndConditionQuery(String table, String dateField, LocalDate dateFrom, LocalDate dateTo,
//                                   String conditionField, String condition, String pieField, String sliceValue) {
//        return operationRepository.findByDateAndConditionQuery(table, dateField, dateFrom, dateTo,
//                conditionField, condition, pieField, sliceValue);
//    }
//
//    @Override
//    @Transactional(readOnly = true)
//    public List<String> getValues(String field, String table) {
//        return operationRepository.values(field, table);
//    }

    @Override
    @Transactional(readOnly = true)
    public List<OperationDto> selectOperations() {
        return operationMapper.toListDto(operationRepository.selectOperations());
    }

    private Session currentSession() {
        return entityManager.unwrap(Session.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<OperationDto> getOperationsByQuery(String query) {
//        try (Session session = currentSession()) {
//            Query<OperationDto> q = session.createNativeQuery(query, OperationDto.class);
//            return q.list();
//        } catch (Exception exception) {
//            log.error(exception.getMessage(), exception);
//        }
//        return null;

        return entityManager.createQuery(query, OperationDto.class).getResultList();
    }
}
