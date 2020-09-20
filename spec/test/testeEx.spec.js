describe("Spies Functions", () => {
  let Calculator = {
    somar: function (a, b) {
      return a + b;
    },

    subtrair: function (a, b) {
      return a - b;
    },

    multiplicar: function (a, b) {
      return a * b;
    },

    fakeError: function () {
      return new TypeError("fake error");
    },
  };

  beforeAll(() => {
    spyOn(Calculator, "somar"); // Objeto spy indefinido (Fake data Mock)

    /** Muda um objeto spy para outro comportamento */
    // spyOn(Calculator, "somar").and.callFake(function (a, b) {
    //   return a - b;
    // });

    spyOn(Calculator, "subtrair").and.callThrough(); // Objeto SPY com a chamada Original

    // spyOn(Calculator, "multiplicar").and.returnValue(25); // Objeto SPY esperando esse valor

    spyOn(Calculator, "multiplicar").and.returnValues(25, 4); // Objeto SPY esperando esses valores por cada chamada

    spyOn(Calculator, "fakeError").and.throwError("fake error");
  });

  it("Deve possuir o met. somar undefined", () => {
    expect(Calculator.somar(1, 1)).toBeUndefined();
  });

  it("Deve chamar o met. somar ao menos 1", () => {
    Calculator.somar(1, 1);
    expect(Calculator.somar).toHaveBeenCalled(); // Verifica se o spie foi chamado
  });

  it("Deve esperar que o método somar NÃO seja chamado 5 vezes", () => {
    expect(Calculator.somar).not.toHaveBeenCalledTimes(5);
  });

  it("Deve validar se o met. somar foi chamado com os parametros", () => {
    Calculator.somar(4, 5);
    expect(Calculator.somar).toHaveBeenCalledWith(4, 5);
  });

  it("Deve executar o met. subtrair original", () => {
    expect(Calculator.somar(2, 2)).toBeUndefined();
    expect(Calculator.subtrair(2, 2)).toEqual(0); // CallThrough Chama a função em sua forma original
  });

  /**
   * and.returnValue : Informa o valor esperado de retorno para o spy
   * Utilizado para validar consultas externas
   */
  it("Deve chamar o met. multiplicar esperando o valor 25 e 4 ", () => {
    expect(Calculator.multiplicar(5, 5)).toEqual(25);
    expect(Calculator.multiplicar(2, 2)).toEqual(4);
  });

  it("Deve lançar um error", () => {
    expect(function () {
      Calculator.fakeError();
    }).toThrowError("fake error");
  });

  xit("Deve verificar se o met. somar foi chamado ao menos 1 vez", () => {
    expect(Calculator.somar.calls.any()).toBeTruthy();
  });

  xit("Deve validar se o met. somar foi chamado n vezes", () => {
    expect(Calculator.somar.calls.count()).toBeGreaterThan(0); // Count armazena o n. de chamadas do spy
  });

  xit("Deve verificar os parametros informados nas chamadas", () => {
    Calculator.somar(2, 2);
    Calculator.somar(5, 3);

    expect(Calculator.somar.calls.argsFor(0)).toEqual([2, 2]);
    expect(Calculator.somar.calls.argsFor(1)).toEqual([5, 3]);

    expect(Calculator.somar.calls.allArgs()).toEqual([2, 2], [5, 3]); // allArgs retorna todos os parametros chamados nas execuções

    let retorno = Calculator.somar.calls.all(); // Retorna todas as informações do objeto spy

    expect(retorno[0].object).toEqual(Calculator);
  });

  xit("Deve retornar os dados da primeira chamada do spy", () => {
    Calculator.somar(1, 1);

    let retorno = Calculator.somar.calls.first(); // Retorna dados da primeira chamada encontrada

    expect(retorno.object).toEqual(Calculator);
    expect(retorno.args).toEqual([1, 1]);
    expect(retorno.returnValue).toEqual(5);
  });

  it("Deve limpar e verificar que o met. somar não possui dados de chamadas", () => {
    Calculator.somar.calls.reset(); // Limpa os dados de chamada

    expect(Calculator.somar.calls.any()).toBeFalsy();
  });
});

describe("Funções do Jasmine", () => {
  let somar;
  let Calculator;
  let dobro;

  beforeAll(() => {
    somar = jasmine.createSpy("somar");
    dobro = jasmine.createSpy("dobro");

    Calculator = jasmine.createSpyObj("Calculator", ["somar", "subtrair"]);

    Calculator.somar.and.returnValue(5);
  });

  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it("Deve verificar se o spye foi criado e chamado com os parametros", () => {
    somar(2, 2);
    expect(somar).toHaveBeenCalledWith(2, 2);
  });

  it("Deve validar se o objeto spy foi chamado", () => {
    let ret = Calculator.somar(1, 2);

    expect(Calculator.somar).toHaveBeenCalledWith(1, 2);
    expect(ret).toEqual(5);
  });

  it("Deve verificar se o met. dobro foi chamado com um valor númerico", () => {
    dobro(10);
    expect(dobro).toHaveBeenCalledWith(jasmine.any(Number)); // Verifica se o metódo foi chamado com um parametro do tipo number
  });

  it("Deve verificar se o met. dobro foi chamado com qualquer tipo de valor", () => {
    dobro(10);
    expect(dobro).toHaveBeenCalledWith(jasmine.anything(Number));

    expect({}).toEqual(jasmine.anything());
  });

  it("Deve verificar se determinada chave ou valor existe em um objeto", () => {
    const obj = {
      nome: "Fruta",
      desc: "Maça",
    };
    expect(obj).toEqual(jasmine.objectContaining({ nome: "Fruta" }));

    const array = [77, 12, 22];
    expect(array).toEqual(jasmine.arrayContaining([77, 12]));
  });

  it("Deve procurar uma parte de uma string ou exp. regular", () => {
    const text = "Texto de exemplo";

    expect(text).toEqual(jasmine.stringMatching("exemplo"));
  });

  it("Deve tornar as chamadas de setTimeOut e SetInterval como Sincronas", () => {
    setTimeout(() => {
      dobro(10);
    }, 1000);

    jasmine.clock().tick(1000);

    expect(dobro).toHaveBeenCalled();

    setInterval(() => {
      dobro(20);
    }, 500);

    jasmine.clock().tick(500);

    expect(dobro).toHaveBeenCalled();
  });
});

/** Criar um comparador custom */

const myMatcher = {
  toBeValidEmail: function (util, customEqualityTesters) {
    const emaiRegex = /\S+@\S+\.\S+/; //String @ string . string
    return {
      compare: function (actual, expected) {
        let result = {};
        if (expected === undefined) {
          result.pass = emaiRegex.test(actual);
        } else {
          result.pass = expected.test(actual);
        }

        if (result.pass) {
          result.message = `${actual} é um email válido!`;
        } else {
          result.message = `${actual} é um email inválido!`;
        }
        return result;
      },
    };
  },
};

describe("Comparador Custom", () => {
  beforeEach(() => {
    jasmine.addMatchers(myMatcher);
  });

  it("Deve verificar se um email é válido", () => {
    expect("user@mail.com").toBeValidEmail();
  });
});
