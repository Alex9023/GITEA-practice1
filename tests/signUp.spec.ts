import { test, expect } from '@playwright/test';
import SignUp from '../pom/SignUp';
import { faker } from '@faker-js/faker'
import BaseMethods from '../pom/BaseMethods';


test.describe(('Sign Up'), () => {
  let signUp: SignUp;
  let base: BaseMethods;
  let userName: string;
  let email: string;
  let password: string;
  test.beforeEach(async ({page}) => {
      userName = faker.internet.username()
      email = faker.internet.email()
      password = faker.internet.password()
    signUp = new SignUp(page)
    base = new BaseMethods(page)
    await signUp.openPage()
  })

  test('Positive - Success Sign Up', async () => {
    await base.enterField(signUp.userName, userName);
    await base.enterField(signUp.email, email);
    await base.enterField(signUp.password, password);
    await base.enterField(signUp.retypePassword, password);
    await signUp.clickRegisterAccount()
    await signUp.isSuccessSignUpMessageShown()
    await base.isAuthorizedUserShown(userName)
  })

  test('Negative - Verify validation message by not matched passwords', async () => {
    await base.enterField(signUp.userName, userName);
    await base.enterField(signUp.email, email);
    await base.enterField(signUp.password, password);
    await base.enterField(signUp.retypePassword, '123');
    await signUp.clickRegisterAccount()
    await base.isErrorMessageShown(signUp.errorMessages.notMatchedPasswords)
  })


  test('Negative - Verify required fields', async () => {
    const signUpFields = [
      signUp.userName,
      signUp.email,
      signUp.password,
      signUp.retypePassword
    ]

    await signUp.clickRegisterAccount()
  
    for(let i = 0; i < signUpFields.length; i++) {
      await expect(signUpFields[i]).toHaveJSProperty('validity.valid', false)
      await expect(signUpFields[i]).toHaveJSProperty('validationMessage', signUp.errorMessages.emptyField)
    }
    for(let i = 0; i < signUpFields.length - 1; i++) {
      const fieldsToCheck = signUpFields.filter(el => el !== signUpFields[i])
      await base.enterField(signUpFields[i], `${userName}@random.com`)
      await signUp.clickRegisterAccount()
      await expect(signUpFields[i]).toHaveJSProperty('validity.valid', true)
      await expect(signUpFields[i + 1]).toHaveJSProperty('validationMessage', signUp.errorMessages.emptyField)
      await expect(fieldsToCheck[i]).toHaveJSProperty('validity.valid', false)
    }

  })


  
})