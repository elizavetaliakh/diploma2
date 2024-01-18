package com.diploma.customs.repository;

import com.diploma.customs.model.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface OperationRepository extends JpaRepository<Operation, Long> {
    //для пересчета с учетом только даты
//    @Query(value = "SELECT * FROM ?1 WHERE ?2 BETWEEN '?3' AND '?4' AND ?5 = '?6'",
//            countQuery = "SELECT count(*) FROM ?1",
//            nativeQuery = true)
//    int findByDateQuery(String table, String dateField, LocalDate dateFrom, LocalDate dateTo, String pieField, String sliceValue);
//
//    //для пересчета с учтом только условия
//    @Query(value = "SELECT * FROM ?1 WHERE ?2 = '?3' AND ?5 = '?6'",
//            countQuery = "SELECT count(*) FROM ?1",
//            nativeQuery = true)
//    int findByConditionQuery(String table, String conditionField, String condition, String pieField, String sliceValue);
//
//    //для пересчета с учетом даты и условия
//    @Query(value = "SELECT * FROM ?1 WHERE ?2 BETWEEN '?3' AND '?4' AND ?5 = '?6' AND ?7 = '?8'",
//            countQuery = "SELECT count(*) FROM ?1",
//            nativeQuery = true)
//    int findByDateAndConditionQuery(String table, String dateField, LocalDate dateFrom, LocalDate dateTo,
//                                                String conditionField, String condition, String pieField, String sliceValue);
//
//    //для выборки различных значений из столбца
//    @Query(value = "SELECT DISTINCT ?1 FROM ?2",  nativeQuery = true)
//    List<String> values(String field, String table);

    //для вывода строк в структуре бд
    @Query(value = "SELECT * FROM operations",  nativeQuery = true)
    List<Operation> selectOperations();

    @Query(value = "SELECT COUNT(*) FROM operations", nativeQuery = true)
    Integer getRowNumberOperations();

    @Query(value = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_catalog = :catalog" +
            " AND table_name = :table", nativeQuery = true)
    Integer getColumnsNumber(@Param("catalog") String catalog, @Param("table") String table);

    @Query(value = "SELECT column_name FROM INFORMATION_SCHEMA.COLUMNS WHERE table_catalog = :catalog" +
            " AND table_name = :table", nativeQuery = true)
    List<String> selectColumns(@Param("catalog") String catalog, @Param("table") String table);
}
