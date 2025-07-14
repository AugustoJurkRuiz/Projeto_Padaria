package org.example.resources;
import org.example.dto.FornecedorDto;
import org.example.entities.Fornecedor;
import org.example.services.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/fornecedor")
public class FornecedorResource {


    @Autowired
    private FornecedorService FornecedorService;

    @GetMapping
    public ResponseEntity<List<FornecedorDto>> getAll() {
        List<Fornecedor> list = FornecedorService.findAll();
        List<FornecedorDto> listDto = list.stream().map(obj -> FornecedorService.toNewDto(obj)).collect(Collectors.toList());
        return ResponseEntity.ok().body(listDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FornecedorDto> findById(@PathVariable Long id) {
        Fornecedor obj = FornecedorService.findById(id);
        FornecedorDto dto = FornecedorService.toNewDto(obj);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<Void> insert(@Valid @RequestBody  FornecedorDto objDto) {
        Fornecedor obj = FornecedorService.fromDTO(objDto);
        obj = FornecedorService.insert(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getForId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Void> update(@Valid @RequestBody FornecedorDto objDto, @PathVariable Long id) {
        FornecedorService.update(id, objDto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        FornecedorService.deleteFornecedor(id);
        return ResponseEntity.noContent().build();
    }
}