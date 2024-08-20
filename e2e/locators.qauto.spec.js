import { test, expect } from '@playwright/test';

test('has title',   async ({ page }) => {
  await page.goto('/');

  const header = page.locator('.header')
  const signInBtn = header.getByRole('button', {name : 'Sign in'})
  const modal = page.locator('.modal-content')
  const registrBtn =  modal.getByRole('button', {name: 'Registration'})
  const firstNameInput = modal.getByLabel('Name')
  const lastNameInput = modal.locator('#signupLastName')
  const emailInput = modal.locator('input[name="email"]')


  await signInBtn.click()
  await registrBtn.click()
  await firstNameInput.pressSequentially('John')
  await lastNameInput.pressSequentially('dassadasewf' , {delay: 500 })
  await emailInput.fill('mish@gmail.com')




  await page.pause()
});