package org.example.config;

import org.example.entities.*;
import org.example.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(
            ProdutoRepository produtoRepository,
            FornecedorRepository fornecedorRepository,
            ClienteRepository clienteRepository,
            EnderecoRepository enderecoRepository,
            ContatoRepository contatoRepository,
            FormaPagamentoRepository formaPagamentoRepository,
            VendaRepository vendaRepository
    ) {
        return args -> {


            if (fornecedorRepository.count() == 0) {
                Fornecedor fornecedorPadaria = new Fornecedor(null, "Super Pão LTDA ME", "98.522.995/0001-55", "Padaria Super Pão");
                Fornecedor fornecedorLaticinios = new Fornecedor(null, "Boa Fonte Alimentos SA", "23.813.339/0001-02", "Laticínios Boa Fonte");
                fornecedorRepository.saveAll(Arrays.asList(fornecedorPadaria, fornecedorLaticinios));

                enderecoRepository.saveAll(Arrays.asList(
                        new Endereco(null, fornecedorPadaria, "Rua dos Pães", "100", "São Paulo", "87653-320", "SP"),
                        new Endereco(null, fornecedorLaticinios, "Avenida dos Laticínios", "500", "Campinas", "86162-120", "SP")
                ));

                contatoRepository.saveAll(Arrays.asList(
                        new Contato(null, fornecedorPadaria, "(11) 98712-1245", "(11) 8765-4321", "contatopadariasuperpao@gmail.com"),
                        new Contato(null, fornecedorLaticinios, "(19) 98476-2543", "(19) 2222-3333", "vendasdafonte@gmail.com")
                ));
            }

            if (produtoRepository.count() == 0) {
                Fornecedor fornecedorPadaria = fornecedorRepository.findById(1L).orElseThrow();
                Fornecedor fornecedorLaticinios = fornecedorRepository.findById(2L).orElseThrow();

                Produto produto1 = new Produto(null, "Pão Francês", "Pão tradicional",
                        BigDecimal.valueOf(0.50), BigDecimal.valueOf(1.00), 500,
                        "Padaria", "1234567890001", "Casa do Pão", "unidade",
                        true, LocalDateTime.now(), LocalDateTime.now(), fornecedorPadaria);
                produto1.setFornecedor(fornecedorPadaria);

                Produto produto2 = new Produto(null, "Leite Integral 1L", "Leite pasteurizado",
                        BigDecimal.valueOf(3.00), BigDecimal.valueOf(4.50), 150,
                        "Laticínios", "7896543210002", "Itambé", "litro",
                        true, LocalDateTime.now(), LocalDateTime.now(), fornecedorLaticinios);
                produto2.setFornecedor(fornecedorLaticinios);

                produtoRepository.saveAll(Arrays.asList(produto1, produto2));
            }

            if (clienteRepository.count() == 0) {
                Cliente cliente1 = new Cliente(null, "Maria da Silva", "97505458000");
                Cliente cliente2 = new Cliente(null, "João Oliveira", "59322093056");
                clienteRepository.saveAll(Arrays.asList(cliente1, cliente2));

                enderecoRepository.saveAll(Arrays.asList(
                        new Endereco(null, cliente1, "Rua das Flores", "123", "São Paulo", "01234-567", "SP"),
                        new Endereco(null, cliente2, "Av. Brasil", "1500", "Rio de Janeiro", "26431-120", "RJ")
                ));

                contatoRepository.saveAll(Arrays.asList(
                        new Contato(null, cliente1, "(11) 98765-4321", "(11) 92357-1257", "mariasilv4@gmail.com"),
                        new Contato(null, cliente2, "(21) 99876-5432", "(21) 99876-2341", "joao0l1veir4@gmail.com")
                ));
            }

            if (formaPagamentoRepository.count() == 0) {
                formaPagamentoRepository.saveAll(Arrays.asList(
                        new FormaPagamento(null, "Dinheiro", true, false, 0, BigDecimal.valueOf(0.00)),
                        new FormaPagamento(null, "Cartão de Crédito", true, true, 12, BigDecimal.valueOf(2.50)),
                        new FormaPagamento(null, "Cartão de Débito", true, false, 0, BigDecimal.valueOf(1.00)),
                        new FormaPagamento(null, "PIX", true, false, 0, BigDecimal.valueOf(0.00))
                ));
            }

            if (vendaRepository.count() == 0) {
                Optional<Cliente> clienteOpt = clienteRepository.findById(1L);
                Optional<FormaPagamento> formaOpt = formaPagamentoRepository.findById(1L);

                if (clienteOpt.isPresent() && formaOpt.isPresent()) {
                    Venda venda1 = new Venda();
                    venda1.setCliente(clienteOpt.get());
                    venda1.setFormaPagamento(formaOpt.get());
                    venda1.setVendaValorTotal(BigDecimal.valueOf(20.00));
                    venda1.setVendaCodigo("264538");
                    venda1.setVendaData(LocalDateTime.now());

                    Compra compra1 = new Compra();
                    compra1.setProduto(produtoRepository.findById(1L).orElse(null));
                    compra1.setCompraQuantidade(10);
                    compra1.setCompraPrecoVenda(BigDecimal.valueOf(1.00));
                    compra1.setVenda(venda1);

                    Compra compra2 = new Compra();
                    compra2.setProduto(produtoRepository.findById(2L).orElse(null));
                    compra2.setCompraQuantidade(2);
                    compra2.setCompraPrecoVenda(BigDecimal.valueOf(4.50));
                    compra2.setVenda(venda1);

                    venda1.setCompras(Arrays.asList(compra1, compra2));
                    vendaRepository.save(venda1);
                }
            }

            System.out.println("✅ Dados iniciais verificados e carregados com segurança.");
        };
    }
}
