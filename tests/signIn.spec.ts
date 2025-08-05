import test, { chromium, expect} from "@playwright/test";
import { faker } from "@faker-js/faker";
import BaseMethods from "../pom/BaseMethods";
import SignIn from "../pom/SignIn";
import fs from 'fs';
import path from 'path';
import baseAPI from "../API/baseSetup";
// const testUser = JSON.parse(fs.readFileSync('test-data.json', 'utf-8'));
const filePath = path.resolve(__dirname, '../test-data.json');
const testUser = JSON.parse(fs.readFileSync(filePath, 'utf-8').trim());

test.describe("Sign In", async () => {
  let signIn: SignIn
  let baseApi: baseAPI
  // let userName: string;
  // let email: string;
  // let password: string;
  let base: BaseMethods
  // let baseApi: baseAPI
  
  test.beforeEach(async({page}) => {
      signIn = new SignIn(page)
      baseApi = new baseAPI()
      base = new BaseMethods(page)
    })
    test('API sign up', async ({request, page}) => {
    // baseApi.createUser()
    // userName = faker.internet.username();
    // email = faker.internet.email();
    // password = faker.internet.password();
    const registeredUser = await request.post("/user/sign_up", {
      data: {
        user_name: testUser.userName,
        email: testUser.email,
        password: testUser.password,
        retype: testUser.password,
      },
    });
    expect(registeredUser.status()).toBe(200)
    await page.goto('/user/login')
    await base.enterField(signIn.userName, testUser.userName)
    await base.enterField(signIn.password, testUser.password)
    const signInPromise = page.waitForResponse('/user/login')
    await signIn.clickSignInButton()
    const isSuccessSignIn = await signInPromise
    expect(isSuccessSignIn.status()).toBe(200)
  });

  test('Sign In via API registered user', async({ request}) => {
    let crsfToken: string = ''
    let basicAuthToken: string = ''
    // (async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const tempPage = await context.newPage();

  await tempPage.goto('/user/sign_up'); // or any target URL

  // Get all cookies for the current context
  const cookies = await context.cookies();

  // Find a cookie by name
  const csrfCookie = cookies.find(cookie => cookie.name === '_csrf');
  const basicAuthCookie = cookies.find(cookie => cookie.name === 'i_like_gitea');
  if(csrfCookie) {
    crsfToken = csrfCookie.value
  }
  console.log(crsfToken)
  if(basicAuthCookie) {
    basicAuthToken = basicAuthCookie.value
  }
  console.log(basicAuthToken)

    // await page.goto('/user/login')
   
    // await page.context().storageState({path: `testUser-state.json`})
    // const filePath = path.resolve(__dirname, '../testUser-state.json');
    // const testUser = JSON.parse(fs.readFileSync(filePath, 'utf-8').trim());
    // const basicToken = testUser.cookies.find(cookie => cookie.name === '_csrf').value
    await baseApi.createUser(request, crsfToken, basicAuthToken)
    // await page.goto('/user/login')
    // await base.enterField(signIn.userName, testUser.userName)
    // await base.enterField(signIn.password, testUser.password)
    // const signInPromise = page.waitForResponse('/user/login')
    // await signIn.clickSignInButton()
    // const isSuccessSignIn = await signInPromise
    // expect(isSuccessSignIn.status()).toBe(201)
    // await base.isAuthorizedUserShown(testUser.userName)
    // await page.context().storageState({path: `testUser-state.json`})
  })
});

