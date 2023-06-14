const gf = require('./GetFile.js')
const axios = require('axios');
const cheerio = require('cheerio')

const seedurl = 'https://cdn.preterhuman.net/texts/alien.ufo/'

async function fetchWebPage(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching web page:', error);
      return null;
    }
  }
  
async function Getlinks(html) {
    const $ = cheerio.load(html);
    let links = [];
  
    $('a').each((index, element) => {
      const href = $(element).attr('href');
      links.push(href);
    });
    links = Array.from(new Set(links))
    links = links.slice(9,links.length-4);
return links    
}
 async function extension(text)
{
    const lastDotIndex = text.lastIndexOf('.');
    const fileExtension = text.slice(lastDotIndex + 1);
    if(fileExtension.includes('/'))
    {
        return "Folder"
    }
    return fileExtension
}
async function crawl(url,category)
{const html = await fetchWebPage(url)
  const links = await Getlinks(html)
 for(link of links)
 {

    const type = await extension(link)
    const name = link.slice(0,link.lastIndexOf('.'))
    if(type == "Folder")
await crawl(url+link,link)

 gf.downloadFile(url+link,category,name,type)
}
}
crawl(seedurl)
