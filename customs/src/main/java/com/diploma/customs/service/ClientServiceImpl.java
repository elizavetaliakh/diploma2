package com.diploma.customs.service;

import com.diploma.customs.dto.ClientDto;
import com.diploma.customs.mapper.ClientMapper;
import com.diploma.customs.model.Client;
import com.diploma.customs.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    @Override
    @Transactional(readOnly = true)
    public ClientDto getById(Long clientId) {
        return clientMapper.toDto(clientRepository.findById(clientId).orElse(null));
    }
    @Override
    @Transactional
    public ClientDto save(ClientDto clientDto) {
        Client client = clientMapper.toEntity(clientDto);
        client = clientRepository.save(client);
        return clientMapper.toDto(client);
    }
    @Override
    @Transactional
    public void delete(Long clientId) {
        clientRepository.deleteById(clientId);
    }
    @Override
    @Transactional(readOnly = true)
    public List<ClientDto> getAll() {
        return clientMapper.toListDto(clientRepository.findAll());
    }
//    @Override
//    @Transactional(readOnly = true)
//    public List<ClientDto> selectClients() {
//        return clientMapper.toListDto(clientRepository.selectClients());
//    }
}
