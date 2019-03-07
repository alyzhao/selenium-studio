require('chromedriver')
const webdriver = require('selenium-webdriver')
const By = webdriver.By


let driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build()

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

// function mapping(obj) {
//   let r = {}
//   Reflect.ownKeys(obj).forEach(key => {
//     r[obj[key]] = key
//   })
//   return r
// }

// let functionName_mapping = mapping(functionName)

/**
 * 根据浏览器输入不同的 type 值, 是否是现实对应的功能 
 */
async function assertQueryFunction() {
  let functionNameKeys = Reflect.ownKeys(functionName)
  for (let p of functionNameKeys) {
    await driver.get(`http://127.0.0.1:8000?type=${p}`)
    let label_active = await driver.findElement(By.css('.el-radio-button.is-active'))
    let input_active = await label_active.findElement(By.css('input'))
    let input_value = await input_active.getAttribute('value')
    let condition = input_value == functionName[p]
    console.log(functionName[p] + ' ' + p + ': ' + condition)
  }
}

assertQueryFunction().then(() => {
  driver.quit()  
})
