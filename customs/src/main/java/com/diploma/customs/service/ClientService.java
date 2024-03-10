package com.diploma.customs.service;

import com.diploma.customs.dto.ClientDto;

import java.util.List;

public interface ClientService {
    ClientDto getById(Long clientId);
    ClientDto save(ClientDto client);
    void delete(Long clientId);
    List<ClientDto> getAll();
}
