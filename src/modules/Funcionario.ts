export enum NivelPermissao {
    ADMINISTRADOR = "ADMINISTRADOR",
    ENGENHEIRO = "ENGENHEIRO",
    OPERADOR = "OPERADOR"
}

export default class Funcionario {
    public id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    nivelPermissao: NivelPermissao
    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }
}