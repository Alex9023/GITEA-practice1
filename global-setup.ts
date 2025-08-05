import fs from 'fs';
import { faker } from '@faker-js/faker';
import path from 'path'

async function globalSetup() {
  const testUser = {
     userName: faker.internet.userName() + '_' + Date.now(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
   const filePath = path.resolve(__dirname, 'test-data.json');
  fs.writeFileSync(filePath, JSON.stringify(testUser, null, 2));
  // fs.writeFileSync('test-data.json', JSON.stringify(testUser));
}

export default globalSetup;