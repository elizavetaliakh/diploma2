package com.diploma.customs.service;

import com.diploma.customs.dto.ClientDto;
import com.diploma.customs.dto.OnetimeServiceDto;
import com.diploma.customs.mapper.ClientMapper;
import com.diploma.customs.mapper.OnetimeServiceMapper;
import com.diploma.customs.model.Client;
import com.diploma.customs.model.OnetimeService;
import com.diploma.customs.repository.ClientRepository;
import com.diploma.customs.repository.OnetimeServiceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OnetimeServiceServiceImpl implements OnetimeServiceService {
    private final OnetimeServiceRepository onetimeServiceRepository;
    private final OnetimeServiceMapper onetimeServiceMapper;
    @Override
    @Transactional(readOnly = true)
    public OnetimeServiceDto getById(Long onetimeServiceId) {
        return onetimeServiceMapper.toDto(onetimeServiceRepository.findById(onetimeServiceId).orElse(null));
    }
    @Override
    @Transactional
    public OnetimeServiceDto save(OnetimeServiceDto onetimeServiceDto) {
        OnetimeService onetimeService = onetimeServiceMapper.toEntity(onetimeServiceDto);
        onetimeService = onetimeServiceRepository.save(onetimeService);
        return onetimeServiceMapper.toDto(onetimeService);
    }
    @Override
    @Transactional
    public void delete(Long onetimeServiceId) {
        onetimeServiceRepository.deleteById(onetimeServiceId);
    }
    @Override
    @Transactional(readOnly = true)
    public List<OnetimeServiceDto> getAll() {
        return onetimeServiceMapper.toListDto(onetimeServiceRepository.findAll());
    }
}
