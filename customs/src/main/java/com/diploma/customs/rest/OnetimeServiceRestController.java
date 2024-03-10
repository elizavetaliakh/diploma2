package com.diploma.customs.rest;

import com.diploma.customs.dto.ClientDto;
import com.diploma.customs.dto.OnetimeServiceDto;
import com.diploma.customs.model.OnetimeService;
import com.diploma.customs.service.ClientService;
import com.diploma.customs.service.OnetimeServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/onetime_service/")
@RequiredArgsConstructor
public class OnetimeServiceRestController {
    private final OnetimeServiceService onetimeServiceService;

    @GetMapping("get/{id}")
    public ResponseEntity<OnetimeServiceDto> getOnetimeService(@PathVariable("id") Long onetimeServiceId) {
        if (onetimeServiceId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        OnetimeServiceDto onetimeService = onetimeServiceService.getById(onetimeServiceId);
        if (onetimeService == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(onetimeService, HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<OnetimeServiceDto> saveOnetimeService(@RequestBody OnetimeServiceDto onetimeService) {
        if (onetimeService == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        onetimeService = onetimeServiceService.save(onetimeService);
        return new ResponseEntity<>(onetimeService, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity<OnetimeServiceDto> updateOnetimeService(@RequestBody OnetimeServiceDto onetimeService,
                                                                  UriComponentsBuilder builder) {
        if (onetimeService == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        onetimeService = onetimeServiceService.save(onetimeService);
        return new ResponseEntity<>(onetimeService, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<ClientDto> deleteOnetimeService(@PathVariable("id") Long onetimeServiceId) {
        OnetimeServiceDto onetimeService = onetimeServiceService.getById(onetimeServiceId);
        if (onetimeService == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        onetimeServiceService.delete(onetimeServiceId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<OnetimeServiceDto>> getAllOnetimeServices() {
        List<OnetimeServiceDto> onetimeServices = onetimeServiceService.getAll();
        if (onetimeServices.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(onetimeServices, HttpStatus.OK);
    }
}
