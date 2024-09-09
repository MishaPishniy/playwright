import { test, expect } from '@playwright/test';

test('has title',   async ({ page }) => {
  await page.goto('https://casinochile10.com/');

  const header = page.locator('.header');
  await expect(header).toBeVisible();
  
  const casino = header.getByRole('link', {name : 'Casino En Linea'});
  await expect(casino).toBeVisible();

  const bonus = header.getByRole('link', {name : 'Bonos De Casino'});
  await expect(bonus).toBeVisible();

  const juegos = header.getByRole('link', {name : 'Juegos De Casino'});
  await expect(juegos).toBeVisible();

  const metodos = header.getByRole('link', {name : 'Métodos De Pago'});
  await expect(metodos).toBeVisible();

  const resenas = header.getByRole('link', {name : 'Reseñas De Casinos'});
  await expect(resenas).toBeVisible();

  const table = page.locator('.listing');
  await expect(table).toBeVisible();

  // Выбираем первую кнопку с классом listing-more-btn
  const firstListingMoreBtn = table.locator('button.listing-more-btn').first();
  await expect(firstListingMoreBtn).toBeVisible();

  // Проверяем наличие изображения и его атрибут src для первой кнопки
  const imgInButton = firstListingMoreBtn.locator('img');
  await expect(imgInButton).toHaveAttribute('src', 'https://casinochile10.com/wp-content/themes/casino10/library/images/listing-arrow.svg');

  // Проверяем, что кнопка изначально имеет класс listing-more-btn
  await expect(firstListingMoreBtn).toHaveClass(/listing-more-btn$/);

  // Кликаем по кнопке
  await firstListingMoreBtn.click();

  // Проверяем, что класс изменился на listing-more-btn is-open
  await expect(firstListingMoreBtn).toHaveClass(/listing-more-btn is-open$/);

  // Проверяем первое изображение внутри элемента <figure> в .listing
  const figureImg = table.locator('figure > img').first();  // Выбираем первое изображение
  await expect(figureImg).toHaveAttribute('src', 'https://casinochile10.com/wp-content/uploads/2020/03/royal-vegas-320x180.png');
  await expect(figureImg).toHaveAttribute('alt', '22Bet');
  await expect(figureImg).toHaveClass('listing-logo');

  await page.pause();
});
