package com.diploma.customs.rest;

import com.diploma.customs.dto.ServicesDto;
import com.diploma.customs.service.ServicesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/services/")
@RequiredArgsConstructor
public class ServicesRestController {
    private final ServicesService serviceService;

    @GetMapping("get/{id}")
    public ResponseEntity<ServicesDto> getService(@PathVariable("id") Long serviceId) {
        if (serviceId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        ServicesDto service = serviceService.getById(serviceId);
        if (service == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<ServicesDto> saveService(@RequestBody ServicesDto service) {
        if (service == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        service = serviceService.save(service);
        return new ResponseEntity<>(service, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity<ServicesDto> updateService(@RequestBody ServicesDto service, UriComponentsBuilder builder) {
        if (service == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        service = serviceService.save(service);
        return new ResponseEntity<>(service, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<ServicesDto> deleteService(@PathVariable("id") Long serviceId) {
        ServicesDto service = serviceService.getById(serviceId);
        if (service == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        serviceService.delete(serviceId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<ServicesDto>> getAllServices() {
        List<ServicesDto> services = serviceService.getAll();
        if (services.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(services, HttpStatus.OK);
    }
}
