import Aeronave from './Aeronave';
import * as fs from 'fs';

export default class Relatorio {

    public gerarRelatorio(aeronave: Aeronave, cliente:string) {
        console.log('\nGerando Relatório...\n\n')
        const currentDate: Date = new Date() 
        const formattedDate = currentDate.toLocaleString()
        let dados = 'Cliente: ' + cliente + '\r\nData de entrega: ' + formattedDate + '\r\n'
        const av = '\r\n******** AERONAVE ********\r\n' + 'Código: ' + aeronave.codigo + '\r\nModelo: ' + aeronave.modelo + '\r\nTipo: ' + aeronave.tipo + '\r\nCapacidade: ' + aeronave.capacidade + '\r\nAlcance: ' + aeronave.alcance + '\r\n'
        dados = dados + av

        for (let i = 0; i < aeronave.pecas.length; i++) {

            let p = '\n------- Peça ------\r\n' + 'Nome: ' + aeronave.pecas[i]?.nome + '\r\nTipo: ' + aeronave.pecas[i]?.tipo + '\r\nFornecedor: ' + aeronave.pecas[i]?.fornecedor + '\r\nStatus: ' + aeronave.pecas[i]?.status + '\r\n'
            dados = dados + p 

        }

        for (let i = 0; i < aeronave.etapas.length; i++) {     
            let e  = '\n------- Etapas ------\r\n' + 'Nome: ' + aeronave.etapas[i]?.nome + '\r\nPrazo: ' + aeronave.etapas[i]?.prazo + '\r\nStatus: ' + aeronave.etapas[i]?.status + '\r\n'
            dados = dados + e
            const funcionarios = aeronave.etapas[i]?.funcionarios

            if (funcionarios) {

                for (let c = 0; c < funcionarios.length; c++) {

                    let f = '\n- Funcionários '+ funcionarios[c]?.nome  + ' -\r\n' + 'ID: ' + funcionarios[c]?.id + '\r\nNome: ' + funcionarios[c]?.nome + '\r\n' + 'Nível de Permissão: ' + funcionarios[c]?.nivelPermissao + '\r\n' 
                    dados = dados + f

                }

            }
        }

        for (let i = 0; i < aeronave.historicoDeTestes.length; i++) {

            const hist = aeronave.historicoDeTestes[i]
            let t = '\n----- Testes -----\r\n' + 'Tipo: ' + hist?.tipo + '\r\nResultado: ' + hist?.resultado + '\r\n'
            dados = dados + t

        }
    
        return dados

    }

    public salvarEmArquivo(a: Aeronave, cliente:string) {
        const filePath = `../AV1/src/files/relatorios/Aeronave${a.codigo}.txt`
        const dados = this.gerarRelatorio(a, cliente) || "relatório vazio"
        fs.writeFileSync(filePath, dados, 'utf-8')
        console.log(fs.readFileSync(filePath, 'utf-8'))

    }
        
}
