
import * as Events from '../messages/Events'
import Aeronave from '../modules/Aeronave';
import { TipoAeronave } from '../enums/TipoAeronave';
import Peca from '../modules/Peca';
import { TipoPeca, StatusPeca } from '../enums/TipoStatusPeca';
import Etapa from '../modules/Etapa';
import { StatusEtapa } from "../enums/StatusEtapa";
import Teste from '../modules/Teste';
import { iniciar } from '../app/Main'
import Mensagens from '../messages/Mensagem'
import Funcionario from '../modules/Funcionario'
import { NivelPermissao } from '../enums/NivelPermissao';
import Relatorio from '../modules/Relatorio'

let msg = new Mensagens()

export function menuA() {
    console.log("\n--- AERONAVE ---")
    msg.listarOpcoes()
    console.log("5 - Detalhes")
    console.log('6 - Voltar ao Menu Principal')

    Events.leitor.question("\nDigite a opção: ", (opcao:any) => {

        switch (opcao) {
            

            case "1":
                Events.validarCdg((codigo:any) => {
                    Events.leitor.question("Modelo: ", (modelo:any) => {
                        Events.enTpAeronave((tipo:any) => {
                            Events.leitor.question("Capacidade: ", (capacidade:any) => {
                                Events.leitor.question("Alcance: ", (alcance:any) => {
                                    let novaA = new Aeronave(codigo, modelo, tipo, Number(capacidade), Number(alcance), [], [], [])
                                    Events.aeronaves.push(novaA)
                                    console.log("\nAeronave CADASTRADA")
                                    menuA()
                                })
                            })
                        })
                    })
                })
                break;


            case "2":
                Events.caseA("\nDigite o código da Aeronave: ", (a: Aeronave) => {
                    a.salvar()
                    menuA()
                })
                break;


            case "3":
                Events.leitor.question("Digite o código ca Aeronave: ", (codigo) => {
                    Aeronave.carregar(codigo)
                    menuA()
                })
                break;


            case "4":
                Events.caseA("\nDigite o código da Aeronave: ", (a: Aeronave) => {
                    a.remover()
                    menuA()
                })
                break;


            case "5":
                Events.caseA("\nDigite o código da Aeronave: ", (a: Aeronave) => {
                    a.detalhes()
                    menuA()
                })
                break;


            case "6":
                iniciar()
                break;


            default:
                menuA()


        }
    })
}

export function menuP() {
    console.log("\n--- Peça ---")
    msg.listarOpcoes()
    console.log('5 - Atualizar Status')
    console.log('6 - Voltar ao Menu Principal')

    Events.leitor.question("\nDigite a opção: ", (opcao:any) => {

        switch (opcao) {


            case "1":
                Events.leitor.question("\nNome: ", (nome:any) => {
                    Events.enTpPeca((tipo:any) => {
                        Events.leitor.question("Fornecedor: ", (fornecedor:any) => {
                            Events.enStPeca((status:any) => {
                                let novaP = new Peca(nome, tipo, fornecedor, status.toUpperCase() as StatusPeca)
                                Events.pecas.push(novaP)
                                Events.caseA("Digite o código da Aeronave associada: ", (c:any) => {
                                    c.pecas.push(novaP)
                                    console.log("\nPeça CADASTRADA")
                                    menuP()
                                })
                            })
                        })
                    })
                })
                break;


            case "2":
                Events.caseP("\nDigite o nome da peça: ", (p: Peca) => {
                    Events.caseA("Digite o código da Aeronave associada: ", (c) => {
                        p.salvar(c)
                        menuP()
                    })
                })
                break;


            case "3":
                Events.leitor.question("\nDigite o nome da peça: ", (nome) => {
                    Events.leitor.question("Digite o código da Aeronave associada: ", (c) => {
                        Peca.carregar(nome, c)
                        menuP()
                    })
                })
                break;


            case "4":
                Events.caseP("\nDigite o nome da peça: ", (p: Peca) => {
                    Events.caseA("Digite o código da Aeronave associada: ", (c) => {
                        p.remover(c)
                        menuP()
                    })
                })
                break;


            case "5":
                Events.caseP("\nDigite o nome da peça: ", (p: Peca) => {
                    Events.caseA("Digite o código da Aeronave associada: ", (c) => {
                        Events.leitor.question("Digite o novo status(EM_PRODUCAO, EM_TRANSPORTE, PRONTA): ", (s) => {
                            p.atualizarStatus(s.toUpperCase() as StatusPeca, c)
                            menuP()
                        })
                    })
                })
                break;


            case "6":
                iniciar()
                break;


            default:
                menuP()


        }
    })
}

export function menuE() {
    console.log("\n--- Etapa ---")
    console.log("1 - Cadastrar")
    console.log("2 - Iniciar")
    console.log("3 - Finalizar")
    console.log("4 - Associar Funcionários")
    console.log("5 - Visualizar Funcionários")
    console.log("6 - Voltar ao Menu Principal")
    Events.leitor.question("\nDigite a opção: ", (opcao) => {

        switch (opcao) {


            case "1":
                Events.leitor.question("\nNome: ", (nome) => {
                    Events.leitor.question("Prazo: ", (prazo) => {
                        Events.enStEtapa((status:any) => {
                            let novaE = new Etapa(nome, prazo, status.toUpperCase() as StatusEtapa, [])
                            Events.etapas.push(novaE)
                            Events.caseA("Digite o código da Aeronava associada: ", (c) => {
                                c.etapas.push(novaE)
                                console.log("\nEtapa CADASTRADA")
                                menuE()
                            })
                        })
                    })
                })
                break;


            case "2":
                Events.caseE("\nDigite o nome da Etapa: ", (n) => {
                    n.iniciar()
                    menuE()
                })
                break;


            case "3":
                Events.caseE("\nDigite o nome da Etapa: ", (n) => {
                    n.finalizar()
                    menuE()
                })
                break;


            case "4":
                Events.caseE("\nDigite o nome da Etapa: ", (n) => {
                    Events.caseF("Digite a ID do funcionário: ", (i) => {
                        n.associarFuncionario(i)
                        menuE()
                    })
                })
                break;


            case "5":
                Events.caseE("\nDigite o nome da Etapa: ", (n) => {
                    console.log(n.listaFuncionarios())
                    menuE()
                })
                break;


            case "6":
                iniciar()
                break;


            default:
                menuE()

        }
    })
}

export function menuF() {
    console.log("\n--- Funcionário ---")
    msg.listarOpcoes()
    console.log('5 - Autenticar Usuário')
    console.log("6 - Voltar ao Menu Principal")
    Events.leitor.question("\nDigite a opção: ", (opcao) => {

        switch (opcao) {


            case "1":
                Events.leitor.question("\nID: ", (id) => {
                    Events.leitor.question("Nome: ", (nome) => {
                        Events.leitor.question("Telefone: ", (telefone) => {
                            Events.leitor.question("Endereço: ", (endereco) => {
                                Events.leitor.question("Usuario: ", (usuario) => {
                                    Events.leitor.question("Senha: ", (senha) => {
                                        Events.enNvPerm((nivel:any) => {
                                            let novaF = new Funcionario(id, nome, telefone, endereco, usuario, senha, nivel.toUpperCase() as NivelPermissao)
                                            Events.funcionarios.push(novaF)
                                            console.log("\nFuncionário CADASTRADO")
                                            menuF()
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
                break;


            case "2":
                Events.caseF("\nDigite o ID da Funcionário: ", (f) => {
                    f.salvar()
                    menuF()
                })
                break;


            case "3":
                Events.leitor.question("\nDigite o ID da Funcionário: ", (f) => {
                    Events.leitor.question("\nDigite o nome do Funcionário: ", (nome) => {
                    Funcionario.carregar(f, nome)
                    menuF()
                    })
                })
                break;


            case "4":
                Events.caseF("\nDigite o ID da Funcionário: ", (f) => {
                    f.remover()
                    menuF()
                })
                break;


            case "5":
                Events.leitor.question("\nDigite o usuário do Funcionário: ", (u: string) => {
                    Events.leitor.question("Digite a senha do funcionário: ", (s: string) => {
                        Events.caseF("Digite a ID do funcionário: ", (f) => {
                            const r = f.autenticarUsuario(u, s)
                            if (r == true) {
                                console.log('\nFuncionário AUTENTICADO')
                            } else {
                                console.log('\nUsuário ou Senha INCORRETOS')
                            }
                            menuF()
                        })
                    })
                })
                break;


            case "6":
                iniciar()
                break;


            default:
                menuF()


        }
    })
}

export function menuT() {
    console.log("\n--- Teste ---")
    msg.listarOpcoes()
    console.log('5 - Voltar ao Menu Principal')
    Events.leitor.question("\nDigite a opção: ", (opcao) => {

        switch (opcao) {


            case "1":
                Events.enTpTeste((tipo:any) => {
                    Events.enRsTeste((resultado:any) => {
                        let novaT = new Teste(tipo, resultado)
                        Events.testes.push(novaT)
                        Events.caseA("Digite a Aeronave relacionada: ", (a) => {
                            a.historicoDeTestes.push(novaT)
                            console.log("\nTeste CADASTRADO")
                            menuT()
                        })
                    })
                })
                break;


            case "2":
                Events.caseA("\nDigite o código da Aeronave verificada: ", (a) => {
                    Events.caseT("Digite tipo do Teste: ", (tp) => {
                        tp.salvar(a)
                        menuT()
                    })
                })
                menuT()
                break;


            case "3":
                Events.leitor.question("\nDigite o código da Aeronave verificada: ", (a) => {
                    Events.leitor.question("Digite tipo do Teste: ", (tp) => {
                        Teste.carregar(a, tp)
                        menuT()
                    })
                })
                menuT()
                break;


            case "4":
                Events.caseA("\nDigite o código da Aeronave verificada: ", (a) => {
                    Events.caseT("Digite tipo do Teste: ", (tp) => {
                        tp.remover(a)
                    })
                })
                menuT()
                break;


            case "5":
                iniciar()
                break;


            default:
                menuT()

                
        }
    })
}

export function menuR() {
    console.log("\n--- Relatório ---")
    console.log("1 - Gerar")
    console.log("2 - Salvar")
    console.log('3 - Voltar ao Menu Principal')
    let r = new Relatorio()
    Events.leitor.question("\nDigite a opção: ", (opcao) => {
        switch (opcao) {
            case "1":
                Events.caseA("\nDigite o código da Aeronave: ", (a) => {
                    Events.leitor.question("Digite o nome do Cliente: ", (nome) => {
                        console.log('\nRelatório:\n')
                        console.log(r.gerarRelatorio(a, nome))
                        menuR()
                    })
                })
                break;
            case "2":
                Events.caseA("\nDigite o código da Aeronave: ", (a) => {
                    Events.leitor.question("Digite o nome do Cliente: ", (nome) => {
                        r.salvarEmArquivo(a, nome)
                        console.log("Relatório SALVADO")
                        menuR()
                    })
                })
                break;
            case "3":
                iniciar()
                break;
            default:
                menuR()
        }
    })
}
