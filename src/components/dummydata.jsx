import { faker } from "@faker-js/faker";

export function createRandomUser() {
  const dataTypeMap = {
    int: () => faker.datatype.number(),
    string: () => faker.datatype.string(),
    boolean: () => faker.datatype.boolean(),
    date: () => faker.date.past(),
    float: () => faker.datatype.float(),
    // Add more types as needed
  };

  const typeKeys = Object.keys(dataTypeMap); // Get all the keys (int, string, etc.)
  const randomTypeKey = faker.helpers.arrayElement(typeKeys); // Randomly select a key

  return {
    Name: faker.person.firstName(),
    Type: randomTypeKey, // Set the Type field to the selected type
    Value: dataTypeMap[randomTypeKey](), // Generate a random value of that type
    Description: faker.lorem.sentence(),
  };
}

export const USERS = faker.helpers.multiple(createRandomUser, {
  count: 10,
});

console.log(USERS);
