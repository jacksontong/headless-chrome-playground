const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/", async (req, res) => {
  const body = req.body;

  // instantiate browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (body.viewport) {
    // set page viewport
    await page.setViewport(body.viewport);
  }

  // go to the url
  await page.goto(body.url, {
    waitUntil: "networkidle2",
  });

  // print the pdf
  const buffer = await page.pdf(body.paperSize);

  await browser.close();

  res.contentType("application/pdf").send(buffer);
});

app.listen(port, () => {
  console.log(`Puppeteer app listening on port ${port}`);
});