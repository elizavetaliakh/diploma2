package com.diploma.customs.service;

import com.diploma.customs.dto.ServicesDto;
import com.diploma.customs.mapper.ServicesMapper;
import com.diploma.customs.model.Services;
import com.diploma.customs.repository.ServicesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ServicesServiceImpl implements ServicesService {
    private final ServicesRepository serviceRepository;
    private final ServicesMapper serviceMapper;

    @Override
    @Transactional(readOnly = true)
    public ServicesDto getById(Long serviceId) {
        return serviceMapper.toDto(serviceRepository.findById(serviceId).orElse(null));
    }

    @Override
    @Transactional
    public ServicesDto save(ServicesDto serviceDto) {
        Services service = serviceMapper.toEntity(serviceDto);
        service = serviceRepository.save(service);
        return serviceMapper.toDto(service);
    }

    @Override
    @Transactional
    public void delete(Long serviceId) {
        serviceRepository.deleteById(serviceId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServicesDto> getAll() {
        return serviceMapper.toListDto(serviceRepository.findAll());
    }
}
