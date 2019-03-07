## 使用 `selenium-webdriver` 自动化测试

`npm i selenium-webdriver -S` 安装依赖

### 测试chrome

1. `npm i chromedriver -S` 安装`chrome`测试插件

```
require('chromedriver')   // 引入 chromedriver
```

### 测试的功能

### selenium-webdriver

#### By 

Describes a mechanism for locating an element on the page.

1. By.className()

2. By.css()

3. By.id()

4. By.xpath() 根据路径查找

通常和 `driver.findElement()` 使用, 返回一个 ` WebElementPromise`

#### WebElementPromise 

WebElementPromise is a promise that will be fulfilled with a WebElement. This serves as a forward proxy on WebElement, allowing calls to be scheduled without directly on this instance before the underlying WebElement has been fulfilled.

1. this.click()

2. this.findElement(locator)

3. this.getAttribute(attributeName)

4. this.getCssValue()

5. this.getId()

6. this.getTagName()

7. this.getText()

#### Builder

1. this.build() This method will return a ThenableWebDriver instance, allowing users to issue commands directly without calling then(). The returned thenable wraps a promise that will resolve to a concrete WebDriver instance. The promise will be rejected if the remote end fails to create a new session.

#### ThenableWebDriver

1. this.close() Closes the current window.

2. this.findElement(locator)

3. this.get(url)

4. this.getCurrentUrl()

5. this.sleep(ms)

6. this.wait(condition, timeout, message)






