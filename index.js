const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request-promise");

async function connectToMongoDb() {
  await mongoose.connect("mongodb+srv://testuser:qwerty123456@cluster0-qqljd.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true});
  console.log("Connected to DB")
}

async function scrapeReddit() {
  const html = await request.get("https://www.reddit.com/r/playrust");
  const $ = await cheerio.load(html);
  const titles = $("h2");

  titles.each((i, el) => {
    const title = $(el).text();
    console.log(title);
  })
}

async function main(){
  await connectToMongoDb();
  await scrapeReddit();
}
main(); 

