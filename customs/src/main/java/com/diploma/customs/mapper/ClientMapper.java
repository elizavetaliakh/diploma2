package com.diploma.customs.mapper;

import com.diploma.customs.dto.ClientDto;
import com.diploma.customs.model.Client;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClientMapper extends DefaultEntityMapper<Client, ClientDto> {
}
