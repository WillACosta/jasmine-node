xdescribe("Matchers Definitions", () => {
  let contador = 0;

  beforeEach(() => {
    contador++;
  });

  afterEach(() => {
    contador = 0;
  });

  it("should behave tobe", () => {
    let ob = { valor: true };
    let ob2 = { valor: true };

    expect(true).toBe(true);
    expect("William Teste").toBe("William Teste");
    expect(ob).not.toBe(ob2); /** Comparação estrita */
  });

  it("should behave toEqual", () => {
    let ob = { valor: true };
    let ob2 = { valor: true };

    expect("William").toEqual("William");
    expect(ob).toEqual(ob2);
  });

  it("should behave toMatch", () => {
    let text = "Teste com Jasmine";
    expect(text).toMatch("Jasmine");
    expect(text).toMatch(
      /jasmine/i
    ); /** Usando expressões regulares, busca por jasmine independente de case sensitive */

    expect("39740-000").toMatch(/^\d{5}-\d{3}$/); // Valida um CEP
  });

  it("should behave toDefined", () => {
    let valor;
    let definido = "Nan";

    expect(valor).toBeUndefined();
    expect(definido).toBeDefined();
  });

  it("should behave toBeNull", () => {
    let numero = null;
    let palavra = "Teste";
    let invalido = undefined;

    expect(numero).toBeNull();
    expect(palavra).not.toBeNull();
    expect(invalido).not.toBeNull();
  });

  it("should behave toBeTruthy", () => {
    valor = "123";
    vazio = "";

    expect(valor).toBeTruthy();
    expect(vazio).toBeFalsy();
  });

  it("should behave toContain", () => {
    let array = [255, "Will", "Maça"];
    let word = "Everything will be fine!";

    expect(array).toContain("Maça");
    expect(word).toContain("will");
  });

  it("should behave toBeLessThan", () => {
    let PI = 3.141516;

    expect(3).toBeLessThan(PI);
    expect(4).toBeGreaterThan(PI);
  });

  it("should behave toThrow and ThrowError", () => {
    const wError = () => {
      return n * 5;
    };

    const whError = (n) => {
      return n * 5;
    };

    expect(wError).toThrow();
    expect(whError).not.toThrow();
  });

  it("should behave ThrowError", () => {
    const add = (a, b) => {
      if (a <= 0 || b <= 0) {
        throw new TypeError("Should Greater 0");
      }
      return a + b;
    };

    expect(function () {
      add(0, 0);
    }).toThrowError();
    expect(function () {
      add(0, 0);
    }).toThrowError("Should Greater 0"); // Valida a mensagem da exceção
    // expect(function(){ add(0, 0) }).toThrowError(/^\d/); // Valida com expressões regulares
    expect(function () {
      add(0, 0);
    }).toThrowError(TypeError); // Valida o tipo de erro
  });

  it("should behave a Fail", () => {
    const op = function (exec, cb) {
      if (exec) {
        cb();
      }
    };

    op(false, () => {
      fail("Não deve executar uma callback");
    });
  });

  it("should behave increment contador", () => {
    expect(contador).toBeGreaterThan(0);
  });

  it("should behave increment contador", () => {
    expect(contador).toEqual(1);
  });
});
