const { By } = require('selenium-webdriver')

class Player {
  constructor (driver) {
    this.driver = driver
  }

  /**
   * 播放器暂停操作
   */
  async pause() {
    let playBtn = await this.driver.findElement(By.css('.prism-play-btn'))
    let playBtnClass = await playBtn.getAttribute('class')
    console.log(playBtnClass)
    if (playBtnClass.indexOf('playing') >= 0) {
      await playBtn.click()
    } else {
      // 如果是播放状态先, 播放再暂停
      await playBtn.click()
      await playBtn.click()
    }
  }

  /**
   * 播放器播放操作
   */
  async play() {
    let playBtn = await this.driver.findElement(By.css('.prism-play-btn'))
    let playBtnClass = await playBtn.getAttribute('class')
    console.log(playBtnClass)
    if (playBtnClass.indexOf('playing') < 0) {
      // 如果是播放状态, 先暂停再播放
      await playBtn.click()
      await playBtn.click()
    } else {
      await playBtn.click()
    }
  }
}


module.exports = Player