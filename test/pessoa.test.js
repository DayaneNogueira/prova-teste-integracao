const { describe, expect, it, beforeAll, afterAll, beforeEach, afterEach} = require('@jest/globals');
const conexao = require("../src/database")
const ServicoExercicio = require("../src/services/pessoa");

describe('Meu teste de integração', () => {
   let transaction;

   // Executado antes de TODOS os testes
   beforeAll(async () => {
      const servico = new ServicoExercicio();
      console.info('Iniciando TDD com jest!');
   });

   beforeEach(async () => {
      transaction = await conexao.transaction();
   });

   // Executado após TODOS os testes
   afterAll(() => {
      console.info('Encerrados os testes');
   });

   afterEach(async () => {
      await transaction.rollback();
   });

   it('Adicionar uma pessoa', async () => {
      const dataTest = {      
         nome: 'Teste',
         email: 'teste@teste.com',
         senha: '123456'
   }
      const { pessoa } = await service.Adicionar(mockPessoa, dataTest, transaction);
      expect(mockPessoa.nome).toBe(dataTest.nome)
      expect(mockPessoa.email).toBe(dataTest.email)
      expect(mockPessoa.senha).toBe(dataTest.senha)   
   }); 

   it('Alterar uma pessoa', async () => {
      const dataTest = {      
         nome: 'Teste',
         email: 'teste@teste.com',
         senha: '123456'
   }
      const { pessoa } = await service.Alterar(mockPessoa, dataTest, transaction);
      expect(mockPessoa.nome).toBe(dataTest.nome)
      expect(mockPessoa.email).toBe(dataTest.email)
      expect(mockPessoa.senha).toBe(dataTest.senha)   
   }); 

   it('Deletar uma pessoa', async () => {
      const { id } = await service.Deletar(mockPessoa, dataTest, transaction);
      const qtdeBefore = await Number(servico.PegarTodos().length);
      const qtdeAfter = await Number(servico.PegarTodos().length); 

      expect(mockPessoa).toBe(1);
      expect(qtdeAfter + 1).toBe(qtdeBefore);  
   }); 
});
