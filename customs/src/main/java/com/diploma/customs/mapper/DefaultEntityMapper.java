package com.diploma.customs.mapper;

import java.util.List;

public interface DefaultEntityMapper<J, T> {

    T toDto(J e);

    J toEntity(T d);

    List<T> toListDto(List<J> entityList);

    List<J> toListEntity(List<T> entityList);
}
