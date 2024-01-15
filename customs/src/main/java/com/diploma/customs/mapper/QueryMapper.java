package com.diploma.customs.mapper;

import com.diploma.customs.dto.QueryDto;
import com.diploma.customs.model.Query;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QueryMapper extends DefaultEntityMapper<Query, QueryDto> {
}
