package com.diploma.customs.mapper;

import com.diploma.customs.dto.ServiceDto;
import com.diploma.customs.model.Service;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServiceMapper extends DefaultEntityMapper<Service, ServiceDto> {
}
