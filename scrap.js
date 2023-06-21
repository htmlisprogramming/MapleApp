const axios = require("axios");
const cheerio = require("cheerio");

// const puppeteer = require('puppeteer');

// const getMasters = async () => {

//   const browser = await puppeteer.launch({headless: true});
//   const page = await browser.newPage();
//   await page.setViewport({width: 1366,height: 768});
//   await page.goto('https://maple.gg/guild/reboot/Steam');
//   const content = await page.content();
//   const $ = cheerio.load(content);

//   const masterList = $("#guild-content > section > div.mb-4.row.text-center > div");

//   let masters = [];
//   for(let i = 1; i< masterList.length+1; i++){
//     let result = 
//       {
//         img: $(`#guild-content > section > div.mb-4.row.text-center > div:nth-child(${i}) > section > div.mb-2 > a > img`).attr('src'),
//         name: $(`#guild-content > section > div.mb-4.row.text-center > div:nth-child(${i}) > section > div.member-grade > div > div:nth-child(1) > b > a`).text(),
//         lv: $(`#guild-content > section > div.mb-4.row.text-center > div:nth-child(${i}) > section > div.member-grade > div > div:nth-child(2) > span`).text().split("/")[1],
//         ch: $(`#guild-content > section > div.mb-4.row.text-center > div:nth-child(${i}) > section > div.member-grade > div > div:nth-child(2) > span`).text().split("/")[0],
//       }
//     masters.push(result);
//   }
//   console.log(masters);
//   const memberList = $("#guild-content > section > div:nth-child(5) > div");

//   let members = [];
//   for(let i = 1; i< memberList.length+1; i++){
//   let result = 
//     {
//       img: $(`#guild-content > section > div:nth-child(5) > div:nth-child(${i}) > section > div:nth-child(1) > a > img`).attr('src'),
//       name: $(`#guild-content > section > div:nth-child(5) > div:nth-child(${i}) > section > div:nth-child(2) > b > a`).text(),
//       lv: $(`#guild-content > section > div:nth-child(5) > div:nth-child(${i}) > section > div:nth-child(3) > span`).text().split("/")[1],
//       ch: $(`#guild-content > section > div:nth-child(5) > div:nth-child(${i}) > section > div:nth-child(3) > span`).text().split("/")[0],
//     }
//     members.push(result);
//   }
//   browser.close();
//   return {master: masters, member: members};
// }



const getMembers = async () => {
  let info = {};
  let masters = [];
  let members = [];

  for (let j = 1; j <= 10; j++) {
    let result = await axios.get(`https://maplestory.nexon.com/Common/Guild?gid=48904&wid=45&orderby=1&page=${j}`)
    
    const $ = cheerio.load(result.data);

    if( j == 1 )info = {
      worldrank: $('#wrap > div.center_wrap > div.char_info_top > div.char_info > dl:nth-child(1) > dd.num').text(),
      totalrank: $('#wrap > div.center_wrap > div.char_info_top > div.char_info > dl:nth-child(2) > dd.num').text(),
      numbers: $('#wrap > div.center_wrap > div.char_info_top > div.char_info_tb > div:nth-child(1) > ul > li:nth-child(4)').text().replace('길드원 수',''),
      point: $('#wrap > div.center_wrap > div.char_info_top > div.char_info_tb > div:nth-child(1) > ul > li:nth-child(3)').text().replace('주간 명성치','')
    }

    const charList = $("#container > div > div > table > tbody > tr");
    for (let i = 1; i <= charList.length; i++) {
      const data = { 
        img: $(`#container > div > div > table > tbody > tr:nth-child(${i}) > td.left > span > img:nth-child(1)`).attr('src'),
        name: $(`#container > div > div > table > tbody > tr:nth-child(${i}) > td.left > dl > dt > a`).text(),
        lv : $(`#container > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`).text(),
        ch : $(`#container > div > div > table > tbody > tr:nth-child(${i}) > td.left > dl > dd`).text()
      };
      
      const position = $(`#container > div > div > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`).text();
      if(position == "길드원"){
        members.push(data);
      }else{
        masters.push(data)
      }
    
    }



  }

  return {info:info, masters: masters, members:members}
}

module.exports.getMembers = getMembers;
