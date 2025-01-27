import { validateId } from "../src/ValidateId";

test ("Should validate a ID with a digit other than zero", function () {
  const id = "97456321558";
  const isValid = validateId(id);
  expect(isValid).toBe(true);
});

test ("Should validate a ID with the second digit zero", function () {
  const id = "71428793860";
  const isValid = validateId(id);
  expect(isValid).toBe(true);
});

test ("Should validate a ID with the first digit zero", function () {
  const id = "87748248800";
  const isValid = validateId(id);
  expect(isValid).toBe(true);
});

test ("Should not validate a ID with less than 11 characters", function () {
  const id = "9745632155";
  const isValid = validateId(id);
  expect(isValid).toBe(false);
});

test ("Should not validate a ID with all the same characters", function () {
  const id = "11111111111";
  const isValid = validateId(id);
  expect(isValid).toBe(false);
});

test ("Should not validate a ID with letters", function () {
  const id = "97a56321558";
  const isValid = validateId(id);
  expect(isValid).toBe(false);
});

