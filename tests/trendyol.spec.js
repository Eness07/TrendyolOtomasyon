import { test, expect } from '@playwright/test';
test.use({ trace: 'on' });
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { USERNAME, PASSWORD } = require('../config');
async function launchBrowserFullScreen() {
  const browser = await chromium.launch({
    headless: false
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();
  
  return { browser, page };
}

test('trendMonster', async () => {
  const { browser, page } = await launchBrowserFullScreen();
  
  // Tüm sayfanın yavaşça aşağı doğru kaydırılması
async function scrollPageToBottom(page) {
  let previousHeight = await page.evaluate(() => document.body.scrollHeight);

  while (true) {
    // Sayfayı aşağı kaydır
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight / 10); // Her adımda ekran yüksekliğinin 1/10'u kadar kaydır
    });

    // Kısa bir süre bekle (sayfa içeriği dinamik yüklenebilir)
    await page.waitForTimeout(500);

    // Yeni sayfa yüksekliği
    let newHeight = await page.evaluate(() => document.body.scrollHeight);

    // Eğer sayfa sonuna ulaşıldıysa döngüden çık
    if (newHeight === previousHeight) {
      break;
    }

    // Yeni yüksekliği güncelle
    previousHeight = newHeight;
  }
}


  
  await page.goto('https://www.trendyol.com/');
  
  await page.getByTitle('Kapat', { exact: true }).getByRole('img').click();
  
  await page.locator('p').filter({ hasText: 'Giriş Yap' }).click();
  
  await page.getByTestId('email-input').click();
  
  await page.getByTestId('email-input').fill(USERNAME);
  
  await page.getByTestId('password-input').click();
  
  await page.getByTestId('password-input').fill(PASSWORD);
  
  await page.locator('form').getByRole('button', { name: 'Giriş Yap' }).click();
  
  await page.getByTestId('suggestion').click();
  
  await page.getByTestId('suggestion').fill('Oyuncu Bilgisayarı');
  
  await page.getByTestId('search-icon').click();
  
  await page.getByRole('link', { name: 'MONSTER', exact: true }).click();
  
  await page.locator('div').filter({ hasText: /^Fiyat$/ }).nth(1).click();
  
  await page.getByPlaceholder('En Az').click();
  
  await page.getByPlaceholder('En Az').fill('30000');
  
  await page.getByPlaceholder('En Çok').click();
  
  await page.getByPlaceholder('En Çok').fill('100000');

  await page.locator('#sticky-aggregations').getByRole('button').click();
  
  await scrollPageToBottom(page);

  await browser.close();
});

test('trendGomlek', async () => {
  const { browser, page } = await launchBrowserFullScreen();
  
  const screenshotPath = 'trendGomlekScreenShot';
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }

  let step = 1;
  async function takeScreenshot() {
    await page.screenshot({ path: path.join(screenshotPath, `step${step}.png`) });
    step++;
  }

  await page.goto('https://www.trendyol.com/');
  await takeScreenshot();

  await page.getByTitle('Kapat', { exact: true }).getByRole('img').click();
  await takeScreenshot();

  await page.locator('p').filter({ hasText: 'Giriş Yap' }).click();
  await takeScreenshot();

  await page.getByTestId('email-input').click();
  await takeScreenshot();

  await page.getByTestId('email-input').fill(USERNAME);
  await takeScreenshot();

  await page.getByTestId('password-input').click();
  await takeScreenshot();

  await page.getByTestId('password-input').fill(PASSWORD);
  await takeScreenshot();

  await page.locator('form').getByRole('button', { name: 'Giriş Yap' }).click();
  await takeScreenshot();

  await page.getByTestId('suggestion').click();
  await takeScreenshot();

  await page.getByTestId('suggestion').press('CapsLock');
  await takeScreenshot();

  await page.getByTestId('suggestion').fill('G');
  await takeScreenshot();

  await page.getByTestId('suggestion').press('CapsLock');
  await takeScreenshot();

  await page.getByTestId('suggestion').fill('Gömlek');
  await takeScreenshot();

  await page.getByTestId('search-icon').click();
  await takeScreenshot();

  await page.waitForSelector('.overlay[data-dr-hide="true"]',{timeout: 5000 });
  await page.click('.overlay[data-dr-hide="true"]');
  
  await page.locator('.fvrt-btn').first().click();
  await takeScreenshot();

  await page.getByRole('link', { name: '  Favorilerim' }).click();
  await takeScreenshot();

  await page.getByText('Sepete Ekle').first().click();
  await takeScreenshot();

  await page.getByRole('link', { name: '  Sepetim' }).click();
  await takeScreenshot();

  await browser.close();
});


test('trendImages', async () => {
  const { browser, page } = await launchBrowserFullScreen();
  
  const screenshotPath = 'trendImagesControl';
  if (!fs.existsSync(screenshotPath)) {
    fs.mkdirSync(screenshotPath);
  }

  let step = 1;
  async function takeScreenshot() {
    await page.screenshot({ path: path.join(screenshotPath, `step${step}.png`) });
    step++;
  }
  
  await page.goto('https://www.trendyol.com/');
  await takeScreenshot();
  await page.getByTitle('Kapat', { exact: true }).getByRole('img').click();
  await takeScreenshot();
  await page.locator('p').filter({ hasText: 'Giriş Yap' }).click();
  await takeScreenshot();
  await page.getByTestId('email-input').click();
  await takeScreenshot();
  await page.getByTestId('email-input').fill(USERNAME);
  await takeScreenshot();
  await page.getByTestId('password-input').click();
  await takeScreenshot();
  await page.getByTestId('password-input').fill(PASSWORD);
  await takeScreenshot();
  await page.locator('form').getByRole('button', { name: 'Giriş Yap' }).click();
  await takeScreenshot();
  await page.getByTestId('suggestion').click();
  await takeScreenshot();
  await page.getByTestId('suggestion').press('CapsLock');
  await takeScreenshot();
  await page.getByTestId('suggestion').fill('G');
  await takeScreenshot();
  await page.getByTestId('suggestion').press('CapsLock');
  await takeScreenshot();
  await page.getByTestId('suggestion').fill('Gömlek');
  await takeScreenshot();
  await page.getByTestId('search-icon').click();
  await takeScreenshot();
  await page.waitForSelector('.overlay[data-dr-hide="true"]');
  await page.click('.overlay[data-dr-hide="true"]');
  await takeScreenshot();
  //Görsel Kontrol
const imageDivs = await page.$$('.p-card-img-wr');
for (let i = 0; i < Math.min(4, imageDivs.length); i++) {
    const currentDiv = imageDivs[i];
    if (currentDiv) {
        const images = await currentDiv.$$('img');
        if (images.length > 0) {
            console.log(`Div ${i + 1} içerisinde görseller mevcut.`);
            for (const image of images) {
                const src = await image.getAttribute('src');
                console.log(`Görsel kaynağı: ${src}`);
                if (!src) {
                    console.error(`Div ${i + 1} içerisinde kaynak belirtilmemiş bir görsel var.`);
                }
            }
        } else {
            console.error(`Div ${i + 1} içerisinde görsel bulunamadı.`);
        }
    } else {
        console.error(`Div ${i + 1} bulunamadı.`);
    }
}

  // Tarayıcıyı kapatma
  await browser.close();

  console.log("case is done");
});
