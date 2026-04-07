import * as fs from 'fs';
import { aeronaves, validarCdg } from '../messages/Events';
import Peca from './Peca';
import Etapa from './Etapa';
import Teste from './Teste';
import  { TipoAeronave } from '../enums/TipoAeronave';

export default class Aeronave {
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

    public detalhes() {

        console.log(`\n
            AERONAVE
        ----------------------
        Código: ${this.codigo}
        Modelo: ${this.modelo}
        Tipo: ${this.tipo}
        Capacidade: ${this.capacidade}
        Alcance: ${this.alcance}
                `)
    }

    public salvar() {
        const dados = JSON.stringify(this, null, 2)
        fs.writeFileSync(this.filePath(), dados, 'utf-8')
        console.log('\nAeronave SALVA')

    }

    public static carregar(codigo:any) {

        if (fs.existsSync(`../AV1/src/files/aeronaves/aeronave${codigo}.txt`)) {
            const fl = fs.readFileSync(`../AV1/src/files/aeronaves/aeronave${codigo}.txt`, 'utf-8')
            const atributos = JSON.parse(fl)
            aeronaves.push(new Aeronave(atributos.codigo, atributos.modelo, atributos.tipo, atributos.capacidade, atributos.alcance, atributos.pecas, atributos.etapas, atributos.historicoDeTestes))
            console.log("\nAeronave CARREGADA")

        } 
        
        else { console.log("\nAeronave não encontrada") }
    }

    public remover() {
        const av = aeronaves.findIndex((a) => a.codigo === this.codigo)

        if (fs.existsSync(this.filePath())) {
            fs.unlinkSync(this.filePath())
            console.log("\nArquivo da Aeronave REMOVIDO")

            if (av) {
                aeronaves.splice(av, 1)
                console.log("\nAeronave REMOVIDA")
            }
        } 
        
        else { console.log("\nAeronave não encontrada") }

    }

    private filePath() { return `../AV1/src/files/aeronaves/aeronave${this.codigo}.txt` }
    
}