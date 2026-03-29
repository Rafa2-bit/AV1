import Etapa from "./Etapa"
import Peca from "./Peca"
import Teste from "./Teste"

export enum TipoAeronave{
    MILITAR = "MILITAR",
    COMERCIAL = "COMERCIAL"
}

export default class Aeronave{
    public codigo: string
    public modelo: string
    public tipo: TipoAeronave
    public capacidade: number
    public alcance: number
    public pecas: Peca[]
    public etapas: Etapa[]
    public historicoDeTestes: Teste[]

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number, pecas: Peca[], etapas: Etapa[], historicoDeTestes: Teste[]) {
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
        this.pecas = pecas
        this.etapas = etapas
        this.historicoDeTestes = historicoDeTestes
    }
}