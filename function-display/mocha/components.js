/**
 * 测试播放器组件
 *
 */

require('chromedriver')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build()

driver.get('http://127.0.0.1:8000')

/**
 * 图片广告的测试
 */
async function testStartADComponent() {
  let span_component = await driver.findElement(By.xpath("//label/span[text()='图片广告']"))
  console.log(span_component)
  span_component.click()
}

testStartADComponent()

