export interface Product {
    proId?: number; // ID do produto (opcional)
    proNome: string; // Nome do produto
    proDescricao?: string; // Descrição do produto (opcional)
    proPrecoCusto: number | null; // Preço de custo do produto
    proPrecoVenda: number | null; // Preço de venda do produto
    proQuantidadeEstoque: number | null; // Quantidade em estoque
    proCategoria?: string; // Categoria do produto (opcional)
    proCodigoBarras?: string; // Código de barras do produto (opcional)
    proMarca?: string; // Marca do produto (opcional)
    proUnidadeMedida?: string; // Unidade de medida do produto (opcional)
    proAtivo: boolean | null; // Status ativo do produto
    proDataCadastro?: string; // Data de cadastro (LocalDateTime mapeado como string)
    proDataAtualizacao?: string; // Data de atualização (LocalDateTime mapeado como string)
}