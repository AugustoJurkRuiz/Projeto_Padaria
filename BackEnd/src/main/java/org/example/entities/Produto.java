package org.example.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Produto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PRO_ID")
    private Long proId;

    @Column(name = "PRO_NOME")
    private String proNome;

    @Column(name = "PRO_DESCRICAO", length = 500)
    private String proDescricao;

    @Column(name = "PRO_PRECO_CUSTO", precision = 10, scale = 2)
    private BigDecimal proPrecoCusto;

    @Column(name = "PRO_PRECO_VENDA", precision = 10, scale = 2)
    private BigDecimal proPrecoVenda;

    @Column(name = "PRO_QUANTIDADE_ESTOQUE")
    private Integer proQuantidadeEstoque;

    @Column(name = "PRO_CATEGORIA")
    private String proCategoria;

    @Column(name = "PRO_CODIGO_BARRAS")
    private String proCodigoBarras;

    @Column(name = "PRO_MARCA")
    private String proMarca;

    @Column(name = "PRO_UNIDADE_MEDIDA")
    private String proUnidadeMedida;

    @Column(name = "PRO_ATIVO")
    private String proAtivo;

    @Column(name = "PRO_DATA_CADASTRO")
    private LocalDateTime proDataCadastro;

    @Column(name = "PRO_DATA_ATUALIZACAO")
    private LocalDateTime proDataAtualizacao;

    public Produto() {
    }

    // Construtor com todos os atributos pode ser adicionado aqui se necessário
    public Produto(Long proId, String proNome, String proDescricao, BigDecimal proPrecoCusto, BigDecimal proPrecoVenda, Integer proQuantidadeEstoque, String proCategoria, String proCodigoBarras, String proMarca, String proUnidadeMedida, String proAtivo, LocalDateTime proDataCadastro, LocalDateTime proDataAtualizacao) {
        this.proId = proId;
        this.proNome = proNome;
        this.proDescricao = proDescricao;
        this.proPrecoCusto = proPrecoCusto;
        this.proPrecoVenda = proPrecoVenda;
        this.proQuantidadeEstoque = proQuantidadeEstoque;
        this.proCategoria = proCategoria;
        this.proCodigoBarras = proCodigoBarras;
        this.proMarca = proMarca;
        this.proUnidadeMedida = proUnidadeMedida;
        this.proAtivo = proAtivo;
        this.proDataCadastro = proDataCadastro;
        this.proDataAtualizacao = proDataAtualizacao;
    }
    // Getters e Setters

    public Long getProId() {
        return proId;
    }

    public void setProId(Long proId) {
        this.proId = proId;
    }

    public String getProNome() {
        return proNome;
    }

    public void setProNome(String proNome) {
        this.proNome = proNome;
    }

    public String getProDescricao() {
        return proDescricao;
    }

    public void setProDescricao(String proDescricao) {
        this.proDescricao = proDescricao;
    }

    public BigDecimal getProPrecoCusto() {
        return proPrecoCusto;
    }

    public void setProPrecoCusto(BigDecimal proPrecoCusto) {
        this.proPrecoCusto = proPrecoCusto;
    }

    public BigDecimal getProPrecoVenda() {
        return proPrecoVenda;
    }

    public void setProPrecoVenda(BigDecimal proPrecoVenda) {
        this.proPrecoVenda = proPrecoVenda;
    }

    public Integer getProQuantidadeEstoque() {
        return proQuantidadeEstoque;
    }

    public void setProQuantidadeEstoque(Integer proQuantidadeEstoque) {
        this.proQuantidadeEstoque = proQuantidadeEstoque;
    }

    public String getProCategoria() {
        return proCategoria;
    }

    public void setProCategoria(String proCategoria) {
        this.proCategoria = proCategoria;
    }

    public String getProCodigoBarras() {
        return proCodigoBarras;
    }

    public void setProCodigoBarras(String proCodigoBarras) {
        this.proCodigoBarras = proCodigoBarras;
    }

    public String getProMarca() {
        return proMarca;
    }

    public void setProMarca(String proMarca) {
        this.proMarca = proMarca;
    }

    public String getProUnidadeMedida() {
        return proUnidadeMedida;
    }

    public void setProUnidadeMedida(String proUnidadeMedida) {
        this.proUnidadeMedida = proUnidadeMedida;
    }

    public String getProAtivo() {
        return proAtivo;
    }

    public void setProAtivo(String proAtivo) {
        this.proAtivo = proAtivo;
    }

    public LocalDateTime getProDataCadastro() {
        return proDataCadastro;
    }

    public void setProDataCadastro(LocalDateTime proDataCadastro) {
        this.proDataCadastro = proDataCadastro;
    }

    public LocalDateTime getProDataAtualizacao() {
        return proDataAtualizacao;
    }

    public void setProDataAtualizacao(LocalDateTime proDataAtualizacao) {
        this.proDataAtualizacao = proDataAtualizacao;
    }
}
