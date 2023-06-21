const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async() => {
    // const browser = await puppeteer.launch({headless: true});
    // const page = await browser.newPage();
    // await page.setViewport({width: 1366,height: 768});
    // await page.goto('https://maple.gg/guild/reboot/Steam');
    // const content = await page.content();
    // const $ = cheerio.load(content);
    // const lists = $("#guild-content > section > div:nth-child(5) > div");

    // let members = [];
    // for(let i = 0; i< lists.length + 1; i++){
    //   let result = 
    //   {
    //       img: $(`#guild-content > section > div:nth-child(5) > div:nth-child(${i}) > section > div:nth-child(1) > a > img`).attr('src'),
    //       name: $(`#guild-content > section > div:nth-child(5) > div:nth-child(${i}) > section > div:nth-child(2) > b > a`).text(),
    //       lv: $(`#guild-content > section > div:nth-child(5) > div:nth-child(${i}) > section > div:nth-child(3) > span`).text().split("/")[1],
    //       ch: $(`#guild-content > section > div:nth-child(5) > div:nth-child(${i}) > section > div:nth-child(3) > span`).text().split("/")[0],
    //     }
    //     members.push(result);
    //   }
    // console.log(members[ members.length-1 ]);
    // browser.close();

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1366,height: 768});
    await page.goto('https://maple.gg/guild/reboot/Steam');
    const content = await page.content();
    const $ = cheerio.load(content);
    const lists = $("#guild-content > section > div.mb-4.row.text-center > div");
    let masters = [];
    for(let i = 1; i< lists.length+1; i++){
      let result = 
      {
          img: $(`#guild-content > section > div.mb-4.row.text-center > div:nth-child(${i}) > section > div.mb-2 > a > img`).attr('src'),
          name: $(`#guild-content > section > div.mb-4.row.text-center > div:nth-child(${i}) > section > div.member-grade > div > div:nth-child(1) > b > a`).text(),
          lv: $(`#guild-content > section > div.mb-4.row.text-center > div:nth-child(${i}) > section > div.member-grade > div > div:nth-child(2) > span`).text().split("/")[1],
          ch: $(`#guild-content > section > div.mb-4.row.text-center > div:nth-child(${i}) > section > div.member-grade > div > div:nth-child(2) > span`).text().split("/")[0],
        }
        masters.push(result);
    }      
      console.log(masters);
    browser.close();
})();