const axios = require("axios")
const cheerio = require("cheerio");



async function apk_dl(url) {
 const id = url.replace("https://play.google.com/store/apps/details?id=" , "")
const srch = await axios.get('https://apkpure.com/apk/' + id)
const $ = cheerio.load(srch.data)

   
    const try2 = await axios.get('https://apkpure.com/' + 'apk' +'/'+ id +'/download?from=details')
    const $s = cheerio.load(try2.data)

  
const res = {
app_name : $('div.title-like > h1').text() ,
version : $('div.details-sdk > span').text() ,
developer : $('div.details-author > p > a').text() ,
ratings: $('div.rating-info >  span > span.average').text() ,
size : $('a > span.fsize > span').text().replace('13.6 MB' , '') ,
icon : $('div.icon > img').attr('src') ,
dl_link : $s('a.ga').attr('href')


}
    return res 
     }


module.exports = apk_dl
