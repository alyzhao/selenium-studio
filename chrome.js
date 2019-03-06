require('chromedriver')

var webdriver = require('selenium-webdriver')

var driver = new webdriver.Builder().forBrowser('chrome').build() //创建一个chrome 浏览器实例

driver.get("https://youtube.com") //打开https://autowebtest.github.io/

driver.sleep(20 * 1000).then(function() {
  driver.quit()
})



