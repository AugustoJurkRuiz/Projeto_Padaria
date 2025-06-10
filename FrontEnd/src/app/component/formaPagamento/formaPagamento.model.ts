// Define a interface FormaPagamento que representa o modelo de dados
export interface FormaPagamento {
    fpgId?: number; // ID da forma de pagamento (opcional)
    fpgDescricao: string; // Descrição da forma de pagamento (obrigatório)
    fpgAtivo:  string; 
    fpgPermiteParcelamento: boolean;
    fpgNumeroMaximoParcelas: number;
    fpgTaxaAdicional: number;
}