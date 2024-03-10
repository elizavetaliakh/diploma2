package com.diploma.customs.mapper;

import com.diploma.customs.dto.ServicesDto;
import com.diploma.customs.model.Services;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ServicesMapper extends DefaultEntityMapper<Services, ServicesDto> {
}
