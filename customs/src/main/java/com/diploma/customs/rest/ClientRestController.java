package com.diploma.customs.rest;

import com.diploma.customs.dto.ClientDto;
import com.diploma.customs.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/api/clients/")
@RequiredArgsConstructor
public class ClientRestController {
    private final ClientService clientService;

    @GetMapping("get/{id}")
    public ResponseEntity<ClientDto> getClient(@PathVariable("id") Long clientId) {
        if (clientId == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        ClientDto client = clientService.getById(clientId);
        if (client == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    @PostMapping("save")
    public ResponseEntity<ClientDto> saveClient(@RequestBody ClientDto client) {
        if (client == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        client = clientService.save(client);
        return new ResponseEntity<>(client, HttpStatus.CREATED);
    }

    @PutMapping("update")
    public ResponseEntity<ClientDto> updateClient(@RequestBody ClientDto client, UriComponentsBuilder builder) {
        if (client == null) return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        client = clientService.save(client);
        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    @DeleteMapping(value = "delete/{id}")
    public ResponseEntity<ClientDto> deleteClient(@PathVariable("id") Long clientId) {
        ClientDto client = clientService.getById(clientId);
        if (client == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        clientService.delete(clientId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("all")
    public ResponseEntity<List<ClientDto>> getAllClients() {
        List<ClientDto> clients = clientService.getAll();
        if (clients.isEmpty()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }
}
