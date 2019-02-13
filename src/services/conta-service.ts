import { Events } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Conta } from '../models/conta';
import { PessoaProduto } from '../models/pessoa-produto';
import { Storage } from '@ionic/storage';
import { ProdutoPessoa } from '../models/produto-pessoa';


@Injectable()
export class ContaService {

  constructor(private storage: Storage,
    public _events: Events) {
  }

  public criaConta(nome: string): Conta {
    let conta: Conta = <Conta>{
      id: 1,
      nome: nome,
      consumidores: [],
      pessoas: [],
      produtos: [],
      total: 0
    };
    this.storage.remove('conta').then(p => this.storage.set('conta', conta));
    return conta;
  }

  public updateConta(conta: Conta): void {
    this.storage.set('conta', conta);
    this._events.publish('update-conta', conta);
  }

  public getConta(): Promise<Conta> {
    return this.storage.get('conta');
  }

  // ex: para listar cada pessoa e dentro dela, cada produto consumido por ela
  public criaListaPessoaComProdutos(conta: Conta): Array<PessoaProduto> {
    let lista: Array<PessoaProduto> = [];
    conta.pessoas.forEach(p => {
      let pp = <PessoaProduto>{
        pessoa: p,
        produtosConsumidos: conta.consumidores.filter(c => c.pessoa.nome == p.nome)
      };

      lista.push(pp);
    });

    return lista;
  }

  public criaListaProdutoComPessoas(conta: Conta): Array<ProdutoPessoa> {
    let lista: Array<ProdutoPessoa> = [];
    conta.produtos.forEach(p => {
      let pp = <ProdutoPessoa>{
        produto: p,
        consumidores: conta.consumidores.filter(c => c.produto.nome == p.nome),
        expanded: false,
      };
      pp.qntdTotal = pp.consumidores.map(c => c.quantidade).reduce((ac, cr) => ac+cr);
      pp.valorTotal = pp.produto.preco * pp.qntdTotal;
      lista.push(pp);
    });

    console.log(lista)

    return lista;
  }

}
