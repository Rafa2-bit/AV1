import Funcionario from "./Funcionario"
import { StatusEtapa } from "../enums/StatusEtapa"

export default class Etapa {
    public nome: string
    public prazo: string
    public status: StatusEtapa
    public funcionarios: Funcionario[]

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Funcionario[]) {
        this.nome = nome
        this.prazo = prazo
        this.status = status
        this.funcionarios = funcionarios
    }

    public iniciar() { 
        this.status = StatusEtapa.ANDAMENTO
        console.log(`\nEtapa ${this.nome} INICIADA\n`)
    }

    public finalizar() {
        this.status = StatusEtapa.CONCLUIDA
        console.log(`\nEtapa ${this.nome} FINALIZADA\n`)
    }

    public associarFuncionario(f: Funcionario) {
        this.funcionarios.push(f)
        console.log(`\nFuncionário ID: ${f.id} Nome: ${f.nome} ADICIONADO\n`)
    }

    public listaFuncionarios() { return this.funcionarios }

}