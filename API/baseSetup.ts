import { faker } from "@faker-js/faker";
import { APIRequestContext, expect } from "@playwright/test";
import fs from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../test-data.json');
const testUser = JSON.parse(fs.readFileSync(filePath, 'utf-8').trim());

export default class baseAPI {
  async createUser(request:APIRequestContext, csrfToken: string, basicAuthToken: string) {

    const registeredUser = await request.post("/user/sign_up", {
      data: {
        _csrf: csrfToken,
        user_name: testUser.userName,
        email: testUser.email,
        password: testUser.password,
        retype: testUser.password,
      },
      headers: {
        _csrf:csrfToken,
        i_like_gitea:basicAuthToken
      }
    });
  
    expect(registeredUser.status()).toBe(201);
  }

  async signIn(request: APIRequestContext) {

    const signIn = await request.post('/user/login', {
      data: {
        user_name: testUser.userName,
        password: testUser.password
      }
    })
     expect(signIn.status()).toBe(201)
     return signIn
    // const authToken = signIn.
    //  fs.writeFileSync('auth-token.json', JSON.stringify({ token }));
    
  }
}
