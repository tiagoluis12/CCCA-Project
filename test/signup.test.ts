import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
}

test("Should create a passenger account", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    id: "97456321558",
    password: "123456",
    isPassenger: true
  };
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const responseGetAccount = await axios.get(`http://localhost:3000/accounts/${outputSignup.accountId}`);
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.id).toBe(input.id);
  expect(outputGetAccount.password).toBe(input.password);
  expect(outputGetAccount.is_passenger).toBe(input.isPassenger);
})

test("Should not create a passenger account with an invalid name.", async function () {
  const input = {
    name: "John",
    email: `john.doe${Math.random()}@gmail.com`,
    id: "97456321558",
    password: "123456",
    isPassenger: true
  };
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  expect (responseSignup.status).toBe(422);
  const outputSignup = responseSignup.data;
  expect (outputSignup.message).toBe(-3);
})

test("Should not create a passenger account with an invalid email.", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}`,
    id: "97456321558",
    password: "123456",
    isPassenger: true
  };
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  expect (responseSignup.status).toBe(422);
  const outputSignup = responseSignup.data;
  expect (outputSignup.message).toBe(-2);
})

test("Should not create a passenger account with an invalid Id.", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    id: "9745632155",
    password: "123456",
    isPassenger: true
  };
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  expect (responseSignup.status).toBe(422);
  const outputSignup = responseSignup.data;
  expect (outputSignup.message).toBe(-1);
});

test("Should not create a duplicate passenger account.", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    id: "97456321558",
    password: "123456",
    isPassenger: true
  };
  await axios.post("http://localhost:3000/signup", input);
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  expect (responseSignup.status).toBe(422);
  const outputSignup = responseSignup.data;
  expect (outputSignup.message).toBe(-4);
});

test("Should not create an account for a driver with an invalid license plate.", async function () {
  const input = {
    name: "John Doe",
    email: `john.doe${Math.random()}@gmail.com`,
    id: "97456321558",
    password: "123456",
    carPlate: "AAA999",
    isDriver: true
  };
  const responseSignup = await axios.post("http://localhost:3000/signup", input);
  expect (responseSignup.status).toBe(422);
  const outputSignup = responseSignup.data;
  expect (outputSignup.message).toBe(-5);
});