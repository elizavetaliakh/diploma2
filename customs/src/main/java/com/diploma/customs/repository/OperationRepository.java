package com.diploma.customs.repository;

import com.diploma.customs.model.Operation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface OperationRepository extends JpaRepository<Operation, Long> {
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

    @Query(value = "SELECT data_type FROM FROM INFORMATION_SCHEMA.COLUMNS WHERE table_catalog = :catalog" +
            " AND table_name = :table AND column_name = '" + ":column" + "'", nativeQuery = true)
    String getColumnDataType(@Param("catalog") String catalog, @Param("table") String table, @Param("column") String column);
}
