const https = require('https');
const fs = require('fs');
const mkdir = (destination) =>
{
  var destination = "./output/"+destination
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }
}
const downloadFile = (url,category,iteration,ext,errorcount=0) => {
  https.get(url, response => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download file: ${response.statusCode} ${response.statusMessage}`);
      return;
    }
    mkdir(category)
    path = "./output/"+category + `/${iteration}.${ext}`

    const fileStream = fs.createWriteStream(path);
    response.pipe(fileStream);

    fileStream.on('finish', () => {
      fileStream.close();
      console.log(url,'downloaded successfully!');
    });
  }).on('error', error => {
    console.error('Error while downloading file:', error);
    setTimeout(()=>{downloadFile(url,category,iteration,ext,(errorcount+1))} ,5000)
  });
};
module.exports = {downloadFile}