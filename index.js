const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request-promise");
const RedditArticle = require("./models/RedditArticle");

async function connectToMongoDb() {
  await mongoose.connect("mongodb+srv://testuser:qwerty123456@cluster0-qqljd.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true});
  console.log("Connected to DB")
}

async function scrapeReddit() {
  const html = await request.get("https://www.reddit.com/r/playrust");
  const $ = await cheerio.load(html);
  const titles = $("h2");

  titles.each(async (i, el) => {
    try {
      const title = $(el).text();
      const redditArticle = new RedditArticle({
        title
      });
      await redditArticle.save();
    } catch(err) {
        console.error(err);
    }
  })
}

async function main(){
  await connectToMongoDb();
  await scrapeReddit();
}
main(); 

