const {Builder, By, Key, until} = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var chrome = require('selenium-webdriver/chrome');
var fs = require('fs');
var da = new Date();
var startTime = da.getTime();
var content = '';
var newArray = {link: [], dom_click: [], path_folder: [], port: [], current: [], page: []};
var driver = null;

async function handle() {
    process.argv.slice(2).map(function (arg, i) {
        argRule = arg.split('MqFPJ3HnAV');
        if (argRule[0] && argRule[1]) {
            if (typeof newArray[argRule[0]] != "undefined" && newArray[argRule[0]] != null) {
                newArray[argRule[0]].push(argRule[1]);
            } else {
                newArray[argRule[0]] = argRule[1];
            }
        }
    });

    let url = newArray.link;

    driver = await new Builder().forBrowser('chrome')
        .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:' + newArray['port'][0] + '/wd/hub')
        // .setFirefoxOptions(new firefox.Options().headless())
        .setChromeOptions(new chrome.Options().headless())
        .build();

    await getHtml(url);
}


async function getHtml(url) {
    try {
        await driver.get('' + url + '');
        /**
         * @desc : click trang chủ
         */
        clickPageHome();

        /**
         * @nếu là lazada thì click next page
         */
        nextPageLazada();

        scrollPage();

        await driver.findElement(By.tagName('html')).getAttribute("innerHTML").then(function (profile) {
            var path = newArray['path_folder'][0];
            fs.writeFileSync(path + 'download_file_' + newArray['port'][0] + '.php', profile);
            fs.writeFileSync(path + 'detail.html', profile);
        }, function (err) {
            console.log('Not get content');
            process.exit(0);
        });
    } catch (err) {
        console.log(err);
        await driver.close();
        await driver.quit();
        process.exit(1);
    } finally {
        await driver.close();
        await driver.quit();
        process.exit(0);
    }
}

async function scrollPage() {
    await driver.executeScript('window.scrollTo(0,50);', "");
    await driver.sleep(100);
    await driver.executeScript('window.scrollTo(0,100);', "");
    await driver.sleep(400);
    await driver.executeScript('window.scrollTo(0,500);', "");
    await driver.sleep(400);
    await driver.executeScript('window.scrollTo(0,1000);', "");
    await driver.sleep(400);
    await driver.executeScript('window.scrollTo(0,2000);', "");
    await driver.sleep(400);
    await driver.executeScript('window.scrollTo(0,2500);', "");
    await driver.sleep(400);
    await driver.executeScript('window.scrollTo(0,3000);', "");
    await driver.sleep(400);
}

async function clickPageHome() {
    if (typeof newArray.dom_click != 'undefined' && newArray.dom_click.length != 0) {
        for (var i = 0; i < newArray.dom_click.length; i++) {
            await driver.sleep(1000);
            var existed = await driver.findElement(By.css(newArray.dom_click[i])).then(function () {
                return true; //it existed
            }, function (err) {
                return false;
            });
            console.log(existed);
            if (existed) {
                console.log(newArray.dom_click[i]);
                await driver.findElement(By.css(newArray.dom_click[i])).click();
            }
        }
    }
}

async function nextPageLazada() {
    if (typeof newArray['page'][0] != 'undefined' && parseInt(newArray['page'][0]) > 2 && typeof newArray['current'][0] != 'undefined') {
        var page = parseInt(newArray['page'][0]);
        var current = parseInt(newArray['current'][0]);

        var lazada = await driver.findElement(By.xpath('//li[@class="ant-pagination-item ant-pagination-item-' + current + '"]')).then(function () {
            return true; //it existed
        }, function (err) {
            return false;
        })
        if (lazada) {
            await driver.findElement(By.xpath('//li[@class="ant-pagination-item ant-pagination-item-' + current + '"]')).click();
        }
        await driver.sleep(1000);
        var lazadaPage3 = await driver.findElement(By.xpath('//li[@class="ant-pagination-item ant-pagination-item-' + page + '"]')).then(function () {
            return true; //it existed
        }, function (err) {
            return false;
        })
        if (lazadaPage3) {
            await driver.findElement(By.xpath('//li[@class="ant-pagination-item ant-pagination-item-' + page + '"]')).click();
        }
        await driver.sleep(2000);
    }
}

handle();