package com.diploma.customs.service;

import com.diploma.customs.dto.OnetimeServiceDto;

import java.util.List;

public interface OnetimeServiceService {
    OnetimeServiceDto getById(Long onetimeServiceId);
    OnetimeServiceDto save(OnetimeServiceDto onetimeService);
    void delete(Long onetimeServiceId);
    List<OnetimeServiceDto> getAll();
}
