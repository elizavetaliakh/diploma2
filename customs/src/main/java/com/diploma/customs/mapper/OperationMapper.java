package com.diploma.customs.mapper;

import com.diploma.customs.dto.OperationDto;
import com.diploma.customs.model.Operation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OperationMapper extends DefaultEntityMapper<Operation, OperationDto> {
}
