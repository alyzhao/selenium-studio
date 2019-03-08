/**
 * 测试播放器组件
 *
 */

require('chromedriver')
const webdriver = require('selenium-webdriver')
const By = webdriver.By

const Player = require('../../player-test/base.js')

let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build()

driver.get('http://127.0.0.1:8000')

/**
 * 图片广告的测试
 */
async function testStartADComponent() {
  let span_component = await driver.findElement(By.xpath("//label/span[text()='图片广告']"))
  await span_component.click()
  try {
    let div_startAd = await driver.findElement(By.css('.start-ad'))    
    let img_startAd = await div_startAd.findElement(By.css('img'))
    console.log('true ==> 图片开始广告, 图片渲染成功!')
  } catch (err) {
    console.log(err)
    console.log('false ==> 图片开始广告, 图片未渲染成功!')
  }
  console.log(Date.now())
  await driver.sleep(5000)  // 设置成5s验证倒计时之后开始广告还在不在
  console.log(Date.now())
  try {
    let div_startAd = await driver.findElement(By.css('.start-ad'))    
    let img_startAd = await div_startAd.findElement(By.css('img'))
    console.log('false ==> 图片广告倒计时之后并未删除')
  } catch (err) {
    console.log(err)
    console.log('true ==> 图片广告倒计时之后已删除')
  }

  // 暂停广告
  let player = new Player(driver)
  await player.pause()
  let div_pauseAd = await driver.findElement(By.css('.pause-ad'))
  let pauseAdDisplay = await div_pauseAd.getCssValue('display')
  let pauseAd_condition = pauseAdDisplay === 'block'
  if (pauseAd_condition) {
    console.log('true ==> 暂停图片广告显示成功')    
  } else {
    console.log('false ==> 暂停图片广告显示失败')
  }

  let a_pauseAdClose = await div_pauseAd.findElement(By.css('.btn-close'))
  await a_pauseAdClose.click()
  pauseAdDisplay = await div_pauseAd.getCssValue('display')
  pauseAd_condition = pauseAdDisplay === 'block'
  if (!pauseAd_condition) {
    console.log('true ==> 暂停图片广告关闭成功')    
  } else {
    console.log('false ==> 暂停图片广告关闭失败')
  }

}

// testStartADComponent()

async function testBulletComponent() {
  try {
    let div_bulletScreen = await driver.findElement('.bullet-screen')
    console.log('true ==> 跑马灯组件渲染成功')


    let player = new Player(driver)
    await player.pause()
    let bulletStatus = await div_bulletScreen.getCssValue('animation-play-state')
    console.log('bulletStatus: ', bulletStatus)
    if (bulletStatus === 'paused') {
      console.log('true ==> 播放器暂停时, 跑马灯组件暂停')
    } else {
      console.log('false ==> 播放器暂停时, 跑马灯组件未暂停')
    }



  } catch (err) {
    console.log('false ==> 跑马灯组件未渲染')
  }
}

testBulletComponent()

