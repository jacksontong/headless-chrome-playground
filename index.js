const express = require("express");
const morgan = require("morgan");
const puppeteer = require("puppeteer");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("combined"));

app.post("/", async (req, res) => {
  const body = req.body;
  const browserOptions = {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "disable-dev-shm-usage ",
    ],
  };

  if (process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD === "true") {
    browserOptions.executablePath = "/usr/bin/google-chrome";
  }

  // instantiate browser
  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();

  try {
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

    res.contentType("application/pdf").send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: error.message,
    });
  } finally {
    await browser.close();
  }
});

app.listen(port, () => {
  console.log(`Puppeteer app listening on port ${port}`);
});
