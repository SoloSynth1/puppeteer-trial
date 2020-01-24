const http = require('http')
const puppeteer = require('puppeteer');

async function getHtml() {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto('https://bet.hkjc.com/racing/pages/odds_wpq.aspx?lang=ch', {waitUntil: 'networkidle0'});
    let html = await page.content();
    await browser.close();
    return html;
};

http.createServer(async function (req, res) {
    await res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(await getHtml());
    res.end();
}).listen(8080);

