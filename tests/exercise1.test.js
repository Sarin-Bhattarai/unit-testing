const exercise1 = require("../exercise1");

describe("FizzBuzz", () => {
  it("should throw exception if input is not a number", () => {
    expect(() => {
      exercise1.fizzBuzz("a");
    }).toThrow;
    expect(() => {
      exercise1.fizzBuzz(null);
    }).toThrow;
  });

  it("should return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = exercise1.fizzBuzz(15);
    expect(result).toMatch(/FizzBuzz/);
  });

  it("should return Fizz if input is only divisible by 3 ", () => {
    const result = exercise1.fizzBuzz(6);
    expect(result).toMatch(/Fizz/);
  });

  it("should return Buzz if input is only divisible by 5 ", () => {
    const result = exercise1.fizzBuzz(5);
    expect(result).toMatch(/Buzz/);
  });

  it("should return input if input is not divisible by 3 or 5 ", () => {
    const result = exercise1.fizzBuzz(1);
    expect(result).toBe(1);
  });
});
