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

描述了在页面上定位元素的机制。

- `By.className()`

- `By.css()`

- `By.id()`

- `By.xpath()` 根据路径查找

通常和 `driver.findElement()` 使用, 返回一个 ` WebElementPromise`

#### WebElementPromise

`WebElementPromise`是一个在`fulfilled`状态下返回`WebElement`的`promise`。它充当`WebElement`的转发代理，允许在完成基础`WebElement`之前直接在此实例上调用。

- `this.click()`

- `this.findElement(locator)`

- `this.getAttribute(attributeName)`

- `this.getCssValue()`

- `this.getId()`

- `this.getTagName`

- `this.getText()`

#### Builder

- `this.build()` 该方法将返回一个`ThenableWebDriver`实例，允许用户直接发出命令而不调用then。 返回的thenable包含一个将解析为具体`WebDriver`实例的`promise`。 如果远程端无法创建新会话，该`promise`状态将会变为`reject`。

#### ThenableWebDriver

- `this.close()` 关闭当前窗口

- `this.findElement(locator)`

- `this.get(url)`

- `this.getCurrentUrl()`

- `this.sleep(ms)`

- `this.wait(condition, timeout, message)`






