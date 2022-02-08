const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

//first test = testing numbers
describe("Absolute", () => {
  it("should return a positive number if input is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return a positive number if input is negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return  0 if input is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

//second test = testing string
describe("Greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Sarin");
    expect(result).toMatch(/Sarin/);
    expect(result).toContain("Sarin");
  });
});

//third test = testing arrays
describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    //too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    //too specific
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    //proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    //Ideal way
    expect(result).toEqual(expect.arrayContaining(["EUR", "AUD", "USD"]));
  });
});

//fourth test = testing objects
describe("getProduct", () => {
  it("should return product with the given product Id", () => {
    const result = lib.getProduct(1);
    //too specific
    expect(result).toEqual({ id: 1, price: 10 });
    //ideal way
    expect(result).toMatchObject({ id: 1, price: 10 });
    //as long as we have id and price we will not fail we other properties are added in the function
    expect(result).toHaveProperty("id", 1); //we assign value and then its value whether in string or num or any other data type
  });
});

//fifth test = testing exceptions
describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    //null, undefined, NaN, "", 0, false
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Sarin");
    expect(result).toMatchObject({ username: "Sarin" });
    expect(result.id).toBeGreaterThan(0);
  });
});

//sixth test = mock function
describe("applyDiscount", () => {
  it("should apply 10% discount if customer has more than 10 points", () => {
    //mock function
    db.getCustomerSync = function (customerId) {
      console.log("fake reading customer");
      return { id: customerId, points: 20 };
    };
    const order = { customerId: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

//seventh test = jest mock function
describe("notifyCustomer", () => {
  it("shouldn send an email to the customer ", () => {
    //  const mockFunction =  jest.fn();
    //  mockFunction();
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(mail.send).toHaveBeenCalled();

    expect(mail.send.mock.calls[0][0]).toBe("a"); //first is array and second grabs the first element
    //first [0] since mock calls is an array so it access the first element and returns the argument of arrays so another [0]
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});
