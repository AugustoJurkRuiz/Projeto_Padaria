export interface FormaPagamento {
    fpgId?: number; // ID da forma de pagamento (opcional, mapeia 'id: Long')
    fpgDescricao: string; // Descrição da forma de pagamento (obrigatório, mapeia 'descricao: String')
    fpgAtivo?: boolean | null; // Status ativo (mapeia 'ativo: String' como booleano, assumindo que 'ativo' representa true/false)
    fpgPermiteParcelamento?: boolean | null; // Indica se permite parcelamento (mapeia 'permiteParcelamento: Boolean')
    fpgNumeroMaximoParcelas?: number | null; // Número máximo de parcelas (mapeia 'numeroMaximoParcelas: Integer')
    fpgTaxaAdicional?: number | null; // Taxa adicional em percentual (mapeia 'taxaAdicional: BigDecimal' como number para simplificar)
}