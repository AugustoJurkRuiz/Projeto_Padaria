package org.example.config;

import org.example.entities.*;
import org.example.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(
            ProdutoRepository produtoRepository,
            FornecedorRepository fornecedorRepository,
            ClienteRepository clienteRepository,
            EnderecoRepository enderecoRepository,
            ContatoRepository contatoRepository
    ) {
        return args -> {
            // ---------- PRODUTOS ----------
            produtoRepository.saveAll(Arrays.asList(
                    new Produto(null, "Pão Francês", "Pão tradicional",
                            BigDecimal.valueOf(0.50), BigDecimal.valueOf(1.00), 500,
                            "Padaria", "1234567890001", "Casa do Pão", "unidade",
                            true, LocalDateTime.now(), LocalDateTime.now()),

                    new Produto(null, "Leite Integral 1L", "Leite pasteurizado",
                            BigDecimal.valueOf(3.00), BigDecimal.valueOf(4.50), 150,
                            "Laticínios", "7896543210002", "Itambé", "litro",
                            true, LocalDateTime.now(), LocalDateTime.now())
            ));

            // ---------- FORNECEDORES ----------
            Fornecedor fornecedorPadaria = new Fornecedor();
            fornecedorPadaria.setForNomeFantasia("Padaria Super Pão");
            fornecedorPadaria.setForCnpj("98.522.995/0001-55");
            fornecedorPadaria.setForRazaoSocial("Super Pão LTDA ME");

            Fornecedor fornecedorLaticinios = new Fornecedor();
            fornecedorLaticinios.setForNomeFantasia("Laticínios Boa Fonte");
            fornecedorLaticinios.setForCnpj("23.813.339/0001-02");
            fornecedorLaticinios.setForRazaoSocial("Boa Fonte Alimentos SA");

            // Salvando fornecedores primeiro para gerar IDs
            fornecedorRepository.saveAll(Arrays.asList(
                    fornecedorPadaria,
                    fornecedorLaticinios
            ));

            // Endereços e contatos dos fornecedores
            Endereco endFornecedor1 = new Endereco(
                    null, fornecedorPadaria, "Rua dos Pães", "100",
                    "São Paulo", "01234-00", "SP");

            Contato contFornecedor1 = new Contato(
                    null, fornecedorPadaria, "(11) 1234-5678",
                    "(11) 8765-4321", "contato@padariasuperpao.com.br");

            Endereco endFornecedor2 = new Endereco(
                    null, fornecedorLaticinios, "Avenida dos Laticínios", "500",
                    "Campinas", "13000-00", "SP");

            Contato contFornecedor2 = new Contato(
                    null, fornecedorLaticinios, "(19) 9876-5432",
                    "(19) 2222-3333", "vendas@boafonte.com.br");

            enderecoRepository.saveAll(Arrays.asList(
                    endFornecedor1, endFornecedor2
            ));

            contatoRepository.saveAll(Arrays.asList(
                    contFornecedor1, contFornecedor2
            ));

            // ---------- CLIENTES ----------
            Cliente cliente1 = new Cliente();
            cliente1.setCliNome("Maria da Silva");
            cliente1.setCliCpf("97505458000");

            Cliente cliente2 = new Cliente();
            cliente2.setCliNome("João Oliveira");
            cliente2.setCliCpf("59322093056");

            // Salvando clientes primeiro para gerar IDs
            clienteRepository.saveAll(Arrays.asList(cliente1, cliente2));

            // Endereços e contatos dos clientes
            Endereco endCliente1 = new Endereco(
                    null, cliente1, "Rua das Flores", "123",
                    "São Paulo", "01234-56", "SP");

            Contato contCliente1 = new Contato(
                    null, cliente1, "(11) 98765-4321",
                    "(11) 2222-3333", "maria@email.com");

            Endereco endCliente2 = new Endereco(
                    null, cliente2, "Av. Brasil", "1500",
                    "Rio de Janeiro", "20000-00", "RJ");

            Contato contCliente2 = new Contato(
                    null, cliente2, "(21) 99876-5432",
                    "(21) 3333-4444", "joao@empresa.com");

            enderecoRepository.saveAll(Arrays.asList(
                    endCliente1, endCliente2
            ));

            contatoRepository.saveAll(Arrays.asList(
                    contCliente1, contCliente2
            ));

            System.out.println("✅ Dados iniciais carregados com sucesso:\n • 2 produtos\n• 2 fornecedores com endereços e contatos\n• 2 clientes com endereços e contatos ");
        };
    }
}
