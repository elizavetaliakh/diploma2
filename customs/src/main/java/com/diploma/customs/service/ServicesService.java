package com.diploma.customs.service;

import com.diploma.customs.dto.ServicesDto;

import java.util.List;

public interface ServicesService {
    ServicesDto getById(Long serviceId);
    ServicesDto save(ServicesDto service);
    void delete(Long serviceId);
    List<ServicesDto> getAll();
}
