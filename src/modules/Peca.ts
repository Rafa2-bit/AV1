export enum TipoPeca {
    NACIONAL = "NACIONAL",
    IMPORTADA = "IMPORTADA"
}

export enum StatusPeca {
    EM_PRODUCAO = "EM PRODUCAO",
    EM_TRANSPORTE = "EM TRANSPORTE",
    PRONTA = "PRONTA"
}

export default class Peca {
    public nome: string
    public tipo: TipoPeca
    public fornecedor: string
    public status: StatusPeca
    constructor(nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }
}