package org.example.services;

import org.example.dto.ClienteDTO;
import org.example.entities.Cliente;
import org.example.entities.Contato;
import org.example.entities.Endereco;
import org.example.repositories.ClienteRepository;
import org.example.repositories.EnderecoRepository;
import org.example.services.exeptions.ResourceNotFoundException;
import org.example.services.exeptions.ValueBigForAtributeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository repository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    public List<Cliente> findAll(){
        return repository.findAll();
    }

    public Cliente findById(Long id){
        Optional<Cliente> obj = repository.findById(id);
        return obj.orElseThrow(() -> new
                ResourceNotFoundException(id));
    }

    public List<Cliente> getAll() {
        return repository.findAll();
    }

    public Cliente insert(Cliente obj) {
       try{
           obj.setCliId(null);
           obj = repository.save(obj);
           enderecoRepository.saveAll(obj.getEnderecos());
           return obj;
       } catch (DataIntegrityViolationException e){
           throw new ValueBigForAtributeException(e
                   .getMessage());
       }
    }

    public Cliente update(Long id, ClienteDTO objDto) {
        try{
            Cliente entity = findById(id);
            //Atualiza os dados do cliente
            entity.setCliNome(objDto.getCliNome());
            entity.setCliCpf(objDto.getCliCpf());

            //Atualiza o endereço do cleinte
            Endereco endereco = entity.getEnderecos().get(0);
            //Assumindo que há apenas um endereço por cleinte
            endereco.setEndRua(objDto.getEndRua());
            endereco.setEndNumero(objDto.getEndNumero());
            endereco.setEndCidade(objDto.getEndCidade());
            endereco.setEndCep(objDto.getEndCep());
            endereco.setEndEstado(objDto.getEndEstado());

            //Atualiza o contato
            Contato contato = entity.getContatos().get(0);
            //Assumindo que há apenas um contato por cleinte
            contato.setConCelular(objDto.getConCelular());
            contato.setConTelefoneComercial(objDto.getConTelefoneComercial());
            contato.setConEmail(objDto.getConEmail());

            //Salva as alterações
            repository.save(entity);

            return entity;
        } catch (DataIntegrityViolationException e){
            throw new ValueBigForAtributeException(e.getMessage());
        }

    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
