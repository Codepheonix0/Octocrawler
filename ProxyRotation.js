const axios = require('axios')
const cheerio = require('cheerio')
var ip_addresses = [];
var port_numbers = [];
async function GetProxy()
{
const html = await axios.get("https://sslproxies.org/") 
try{
const $ = cheerio.load(html.data);

    $("td:nth-child(1)").each(function(index, value) {
      ip_addresses[index] = $(this).text();
    });

    $("td:nth-child(2)").each(function(index, value) {
      port_numbers[index] = $(this).text();
    });

  ip_addresses.join(", ");
  port_numbers.join(", ");
  let random_number = Math.floor(Math.random() * 100);
    return [ip_addresses[random_number],port_numbers[random_number]]

  } catch(error)
  {
    console.log("Error loading proxy, please try again");
  }


}
module.exports = {GetProxy}