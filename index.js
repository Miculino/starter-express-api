const express = require('express')
const puppeteer = require('puppeteer')
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('test.ejs')
})



app.post('/api/snapshot', async (req, res) => {
    // if (!req.query.url || !req.query.width || !req.query.height) {
    //     res.status(400).send({message: 'Invalid input'})
    //     return
    // }
  const { finalCode } = req.body;
  console.log(req.body)

    // Create a snapshot and send it back
    const browser = await puppeteer.launch({ headless: 'new', defaultViewport: {
      width: 1920,
      height: 1080
    }})
    const page = await browser.newPage()
    await page.setContent(finalCode)
    // await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36')
    // await page.goto('http://localhost:3800', {waitUntil: 'networkidle2'})
    const buffer =   await page.screenshot({
      path: 'screenshot_full.png',
      fullPage: true
  })
  console.log(buffer);
    // Send it back
    res.setHeader('content-type', 'image/png')
    res.write(buffer,'binary')
    res.end(null, 'binary')
    // Close browser and page
    await page.close()
  })

app.listen(process.env.PORT || 3800)