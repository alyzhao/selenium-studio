/**
 * 测试播放器组件
 *
 */

require('chromedriver')
const webdriver = require('selenium-webdriver')
const By = webdriver.By
const until = webdriver.until

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

/**
 * 跑马灯组件测试
 */
async function testBulletComponent() {
  let span_component = await driver.findElement(By.xpath("//label/span[text()='跑马灯']"))
  await span_component.click()
  try {
    let div_bulletScreen = await driver.findElement(By.css('.bullet-screen'))
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
    console.log(err)
    console.log('false ==> 跑马灯组件未渲染')
  }
}

/**
 * 记忆播放组件测试
 * 刷新之后测试是否和上次的播放进度是同时的
 */
async function testMemoryComponent() {
  let span_component = await driver.findElement(By.xpath("//label/span[text()='记忆播放']"))
  await span_component.click()

  let player = new Player(driver)
  let span_currentTime = await driver.findElement(By.css('.current-time'))
  await player.play()
  await driver.sleep(15000)
  let currentTime = await span_currentTime.getText()

  // refresh 之后, 之前的 span_currentTime 就不能再用了, 报错: stale element reference: element is not attached to the page document
  await driver.navigate().refresh()

  let div_memoryPlay = await driver.wait(until.elementLocated(By.css('.memory-play')))
  let div_memoryPlay_text = await div_memoryPlay.getText()

  // 找出记忆播放组件下的三个 span 标签
  let span_memoryArray = await div_memoryPlay.findElements(By.css('span')) 

  // 显示记忆点的是第二个 span 标签
  let span_memoryTime = span_memoryArray[1]
  let memoryTime = await span_memoryTime.getText()
  let condition_memeoryTime = memoryTime === currentTime
  console.log(`${condition_memeoryTime} ==> 记忆播放时间${condition_memeoryTime ? '正确' : '错误'}`)

  if (!condition_memeoryTime) {
    return
  }

  let span_playJump = span_memoryArray[2]
  await span_playJump.click()

  // 必须重新获取该元素, 否则报错 stale element reference
  let span_currentTime_refresh = await driver.findElement(By.css('.current-time')) 
  let memoryTime_click = await span_currentTime_refresh.getText()
  let condition_memeoryPlay = memoryTime_click === memoryTime
  console.log(`${condition_memeoryPlay} ==> 记忆播放点击播放时间 ${condition_memeoryTime ? '正确' : '错误'}`)
}

/**
 * 视频列表组件测试
 * 是否显示出来列表组件, 下一个, 上一个, 直接点击播放
 */
async function testPlayList() {

  let span_component = await driver.findElement(By.xpath("//label/span[text()='视频列表']"))
  await span_component.click()

  // 测试播放列表按钮是否渲染
  let div_playlist_icon = null
  try {
    div_playlist_icon = await driver.findElement(By.css('.playlist-component'))    
    console.log('true ==> 播放列表按钮渲染正确')
  } catch (e) {
    console.log('false ==> 播放列表按钮渲染错误')    
  }

  // 测试播放列表, 列表页是否渲染
  let div_playlist = null
  try {
    // try catch 仍是继发执行
    div_playlist = await driver.findElement(By.css('.playlist-content'))
    console.log('true ==> 播放列表, 列表渲染正确')    
  } catch (e) {
    console.log('false ==> 播放列表, 列表渲染错误')
  }

  let div_videoTitleList = await div_playlist.findElements(By.css('.video-item'))
  let videoTitleList = []

  // 继发获取视频标题
  for (let div_videoTitleItem of div_videoTitleList) {
    // getText 只能获取可见的 element 的文本
    let title = await div_videoTitleItem.getAttribute('title')
    videoTitleList.push(title)
  }

  let currentVideoIndex = await getCurrentPlayVideoIndex(videoTitleList)
  // 测试下一个按钮点击
  let icon_skipnext = await div_playlist_icon.findElement(By.css('.icon-skipnext'))
  await driver.sleep(2000)
  await icon_skipnext.click()
  let currentVideoIndex_next = await getCurrentPlayVideoIndex(videoTitleList)
  let condition_skipnext = false
  if (currentVideoIndex !== videoTitleList.length - 1) {
    condition_skipnext = currentVideoIndex_next === currentVideoIndex + 1
  }
  currentVideoIndex = currentVideoIndex_next
  console.log(`${condition_skipnext} ==> 视频列表点击下一个播放${condition_skipnext ? '正确' : '错误'}`)

  // 测试上一个按钮点击
  let icon_skipPrevious = await div_playlist_icon.findElement(By.css('.icon-skip-previous'))
  await icon_skipPrevious.click()
  let currentVideoIndex_prev = await getCurrentPlayVideoIndex(videoTitleList)
  let condition_skipPrevious = false
  if (currentVideoIndex !== 0) {
    condition_skipPrevious = currentVideoIndex_prev === currentVideoIndex - 1
  }
  currentVideoIndex = currentVideoIndex_prev
  console.log(`${condition_skipPrevious} ==> 视频列表点击上一个播放${condition_skipPrevious ? '正确' : '错误'}`)

  // 测试视频列表, 视频点击
  let randomIndex = Math.random() * videoTitleList.length
  randomIndex = Math.floor(randomIndex)
  if (randomIndex === currentVideoIndex) {
    randomIndex = currentVideoIndex !== (videoTitleList.length - 1) ? randomIndex + 1 : randomIndex - 1
  }
  console.log('randomIndex', randomIndex)
  let div_videoItem = div_videoTitleList[randomIndex]
  console.log(div_videoItem)
  try {
    let icon_iconList = await div_playlist_icon.findElement(By.css('.icon-list'))
    await icon_iconList.click()

    // 动画不播放完是不会触发点击事件的, 报错: element not interactable
    await driver.sleep(380)
    // console.log(await div_videoItem.getAttribute('title'))
    await div_videoItem.click()
    currentVideoIndex = await getCurrentPlayVideoIndex(videoTitleList)
    let condition_listClick = currentVideoIndex === randomIndex
    console.log(`${condition_listClick} ==> 视频列表点击播放${condition_listClick ? '正确' : '错误'}`)
  } catch (e) {
    console.log(e)
  }


  async function getCurrentPlayVideoIndex(videoTitleList) {
    let div_active = await driver.findElement(By.css('.video-item.active'))
    let currentTitle = await div_active.getAttribute('title')
    let currentTitle_index = videoTitleList.findIndex(item => item === currentTitle)
    return currentTitle_index
  }
}



testPlayList()
.then(() => {
  driver.quit()
})

