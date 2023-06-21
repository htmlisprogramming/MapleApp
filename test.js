// const axios = require("axios");
// const cheerio = require("cheerio");


// let url = "https://maple.gg/u/%ED%81%AC%EC%82%B0%ED%8B%B0%ED%8E%98";
// axios.get(url)
// .then( (result)=>{
//     const $ = cheerio.load(result.data);
//     const data = $('#user-profile > section > div.row.row-normal > div.col-lg-4.pt-1.pt-sm-0.pb-1.pb-sm-0.text-center.mt-2.mt-lg-0 > div > div.col-6.col-md-8.col-lg-6 > img').attr('src');
//     console.log(data);
// })
// .catch( (err)=>{console.log(err); console.log("tt")})

const axios = require("axios");
const cheerio = require("cheerio");

var url = encodeURI("https://maple.gg/u/완빡맨");
console.log(url)
axios.get(url)
.then( (result)=>{
    console.log(result)
    const $ = cheerio.load(result.data);
    const data = { 
        img: $('#user-profile > section > div.row.row-normal > div.col-lg-4.pt-1.pt-sm-0.pb-1.pb-sm-0.text-center.mt-2.mt-lg-0 > div > div.col-6.col-md-8.col-lg-6 > img').attr('src'),
        lv : $('#user-profile > section > div.row.row-normal > div.col-lg-8 > div.user-summary > ul > li:nth-child(1)').text().split("(")[0],
        ch : $('#user-profile > section > div.row.row-normal > div.col-lg-8 > div.user-summary > ul > li:nth-child(2)').text()
    };

    console.log(data);
})
.catch( (err)=>{console.log(err); console.log("에러")})