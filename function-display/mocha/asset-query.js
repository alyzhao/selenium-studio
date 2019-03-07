/*
 * 需要测试的功能
 * 根据浏览器参数, 渲染对应的组件(对应按钮处于选中状态, 代码, 播放器组件显示正确)
 *
 *
 *
 *
 *
 *
 */

require('chromedriver')

const webdriver = require('selenium-webdriver')
const { Navigation } = require('selenium-webdriver/lib/webdriver')
const { until, By } = require('selenium-webdriver')

let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build()

driver.get('http://127.0.0.1:8000')

const functionName = {
  cover: '封面',
  autoPlayDelay: '延迟播放',
  screenshot: '截图',
  cyclePlay: '循环播放',
  ultraDefinition: '4k视频',
  pictureAD: '图片广告',
  slide: '跑马灯',
  memoryPlay: '记忆播放',
  playlist: '视频列表',
  rotateAndMirror: '旋转镜像',
  videoAd: '视频广告',
  danmu: '弹幕',
  preview: '试看',
  rate: '倍速播放',
  subtitle: '字幕',
  multiTrack: '多音轨',
  multiSource: '多source',
  autoAdjustHls: '自适应hls',
  internationalization: '国际化',
  skinLayout: '自定义皮肤'
}

function mapping(obj) {
  let r = {}
  Reflect.ownKeys(obj).forEach(key => {
    r[obj[key]] = key
  })
  return r
}

let functionName_mapping = mapping(functionName)


// driver.getCurrentUrl()
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

let navigation = new Navigation(driver)

let navigate = driver.navigate()

// driver.wait(until.urlContains('?type=cover'))
//   .then(res => console.log(res)) 
//   .catch(err => console.log(err))

// driver.sleep(2000).then(res => {
//   Reflect.ownKeys(baseFunction).forEach(async (baseFunctionName, index) => {
//     let selector = By.css('input[value=' + baseFunction[baseFunctionName] + ']');
//     selector = By.className('el-radio-button__orig-radio');
//     let element;
//     try {
//       element = await driver.findElement(selector);    
//       element && element.click();
//     } catch (e) {
//       console.log('err: ' + e);
//       console.log(element);
//     }
//   })
  
// })

// let selector = By.css('.el-radio-button__inner');
// driver.findElement(selector).then(found => {
//   console.log(found)
// }).catch(err => console.log(err))

// let element = driver.findElement(selector).then(found => {
//   found.click()  
// }).catch(err => console.log(err))
// driver.sleep(2000).then(res => {
//   driver.getCurrentUrl().then(url => console.log(url))  
// })

/**
 * 测试点击功能名称按钮, 地址栏 type 参数是否变成对应值
 *
 */
async function assertFunctionQuery () {
  let radioButtonList = await driver.findElements(By.css('.el-radio-button--mini'))
  // console.log(radioButtonList)
  for (let radioButton of radioButtonList) {  // 必须继发执行 
  // radioButtonList.forEach(async radioButton => { // 并发执行会错乱
    let input = await radioButton.findElement(By.css('input'))
    let functionName = await input.getAttribute('value')
    let span = await radioButton.findElement(By.css('span'))
    let text = await span.getText()
    let type = functionName_mapping[functionName]
    if (text && text !== '更多') {
      await span.click()
      // driver.sleep(200).then(() => {
      let condition = await assertQueryByCurrentUrl(type)
      console.log(text + ' ' + type + ': ' + condition)        
      // })
    }
    // let condition = await assertQuery(type)
    // let condition = await until.urlContains('?type=' + type)
    // condition.log(condition)
    // console.log(type + ': ' + condition)      
    // driver.getCurrentUrl().then(url => {
    //   console.log(type + ': ' + url)      
    // })  
  // })
  }
}

assertFunctionQuery()

/**
 * 根据当前的 url 判断 type 是否为制定值
 * @param { String type: functionNaem 的值 }
 * @return { Boolean }
 */
async function assertQueryByCurrentUrl(type) {
  let reg = new RegExp('type=' + type)
  let currentUrl = await driver.getCurrentUrl()
  let condition = reg.test(currentUrl)
  // console.log(reg, currentUrl)
  return condition
}

/**
 * 判断浏览器的参数是否为制定值
 * @param { String query 浏览器参数 type 值 }
 * @return { Boolean }
 */
async function assertQuery(query) {
  const condition = await driver.wait(until.urlContains('?type=' + query))
  return condition
}
// console.log(navigate)



