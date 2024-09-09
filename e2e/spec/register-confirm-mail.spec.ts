import {expect, test} from '@playwright/test'

test ('Check comfirm email', async({context})=>{
    const emailPage = await context.newPage() 
    const ligalPage = await context.newPage() 
    const email =   await test.step('Get template email' , async()=>{
        await emailPage.goto('https://temp-mail.org/en')
        const emailInputPage = emailPage.locator('#mail')
        await emailInputPage.waitFor()
        await expect(emailInputPage).toHaveValue(/@/)
        const  tempEmail =  await emailPage.locator('#mail').inputValue()
        return tempEmail
    })

  /*  await test.step('Registr' , async()=>{




    })

    await test.step('Check confirm email' , async()=>{




    }) */



})