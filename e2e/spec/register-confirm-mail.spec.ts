import { expect, test } from "@playwright/test"; // імпорт бібліотек для теста 
import axios from "axios"; // імпорт для апі запитів
import crypto from "node:crypto"; // імпорт ля хешування email у формат MD5.

const USER_NAME = "123qwe"; // USER_NAME — ім'я користувача для реєстрації.
const TEMP_MAIL = `${USER_NAME}@cevipsa.com`; // TEMP_MAIL — тимчасовий email для реєстрації (створюється на основі USER_NAME).
const md5 = crypto.createHash("md5").update(TEMP_MAIL).digest("hex"); // md5 — хеш MD5 від тимчасового email, який використовується для доступу до поштової скриньки.
console.log(md5); //Виводимо хеш MD5 в консоль для відстеження.
test("Check confirmation email", async ({ page }) => {
  await test.step("Register", async () => {
    await page.goto("https://www.liga.net/ua"); // Відкриваємо сторінку "liga.net".
    await page.locator(".header__actions").getByText("Увійти").click(); // Клікаємо на кнопку "Увійти" в шапці сайту.
    await page.getByRole("link", { name: "Зареєструватися" }).click(); // Переходимо на сторінку реєстрації.
    await page.getByPlaceholder("E-mail").fill(TEMP_MAIL); // Заповнюємо поля для email, пароля та підтвердження пароля тимчасовим email (TEMP_MAIL).
    await page.getByPlaceholder("Пароль", { exact: true }).fill(TEMP_MAIL); 
    await page.getByPlaceholder("Повторіть пароль").fill(TEMP_MAIL);
    await page.getByRole("button", { name: "toRegister" }).click(); //Клікаємо на кнопку реєстрації.
  });

  await test.step("Check registration email", async () => {
    const options = {   //Оголошуємо options, де визначаємо запит до API для отримання листів на тимчасову поштову скриньку (використовуємо MD5 хеш email).
      method: "GET",   
      url: `https://privatix-temp-mail-v1.p.rapidapi.com/request/mail/id/${md5}/`,
      headers: {
        "x-rapidapi-key": "kpuLYNEQhumshaNGSSCGkasZ1oHDp1JDCUpjsnpz2J7ywb4Fys",
        "x-rapidapi-host": "privatix-temp-mail-v1.p.rapidapi.com",
      },
    };
    //Виконуємо запит до API в циклі, поки не отримаємо відповідь або не пройде 5 спроб (з інтервалом у 2 секунди).
    let response;
    let counter = 0;
    do {
      await page.waitForTimeout(2000);
      response = await axios.request(options);
      console.log(response.data); // Логуємо відповідь у консоль.
      counter++;
    } while (response.data.error && counter < 5);

    expect(response.data.length).toBeGreaterThan(0);
    const registrationEmail = response.data[0]; // Перевіряємо, що листи є (довжина масиву має бути більше 0).
    expect(registrationEmail.mail_from).toEqual('"LIGA.net" <adfree@liga.net>'); // Перевіряємо, що лист надійшов від "LIGA.net" <adfree@liga.net>.
    expect(registrationEmail.mail_subject).toEqual("LIGA - Реєстрація"); // Перевіряємо, що тема листа відповідає "LIGA - Реєстрація".
    expect(
      registrationEmail.mail_text.startsWith(
        `ВІТАЄМО, ${USER_NAME.toUpperCase()}!`   //Перевіряємо, що текст листа починається з привітання з ім'ям користувача (USER_NAME).
      )
    ).toBeTruthy();
  });
});
