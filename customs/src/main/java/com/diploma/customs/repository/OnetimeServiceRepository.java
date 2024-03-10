package com.diploma.customs.repository;

import com.diploma.customs.model.OnetimeService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnetimeServiceRepository extends JpaRepository<OnetimeService, Long> {
}
