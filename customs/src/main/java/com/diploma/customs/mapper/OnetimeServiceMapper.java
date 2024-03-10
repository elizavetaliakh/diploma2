package com.diploma.customs.mapper;

import com.diploma.customs.dto.OnetimeServiceDto;
import com.diploma.customs.model.OnetimeService;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OnetimeServiceMapper extends DefaultEntityMapper<OnetimeService, OnetimeServiceDto> {
}
