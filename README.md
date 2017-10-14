# 解决支付宝小程序，历史记录 5 层限制

### 如何使用？

copy 此仓库到你的项目目录中（支付宝小程序目录）

* 一般会放在 util/ 底下
* 支付宝小程序目录
  * image/
  * page/
  * util/

在 page 中引用

```
import FactoryHistory from '../../util/ali-sm-app-more-history/index'

Page( FactoryHistory({
  data: {}
  ,handle () {
    this.go('/page/index/index') // 正常跳转
    this.goRedirectTo('/page/index/index') // 重定向跳转
  }
}))
```

### api

**this.go( string | object )** 正常跳转有历史记录

```
this.go( pathUrl ) // pathUrl 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用?分隔，参数键与参数值用=相连，不同参数必须用&分隔；如 path?key1=value1&key2=value2

this.go({
  url: pathUrl
  ,success: func // Function 可选填 调用成功的回调函数
  ,fail: func // Function 可选填 调用失败的回调函数
  ,complete: func // Function 可选填 调用结束的回调函数（调用成功、失败都会执行）
})
```

**this.goRedirectTo( string | object )** 重定向跳转 无历史记录

```
// 调用方法和 go 一样，只不过不存历史
```

### 在标签中使用

**正常跳转**

```
<view onTap="handleGo" data-url="/page/index/index"></view>
```

**重定向跳转**

```
// 在标签属性中加 data-redirect="true"
<view onTap="handleGo" data-url="/page/index/index" data-redirect="true"></view>
```


### ps

* **页面跳转需要使用封装的方法，不能在使用原生的 myy.redirectTo / my.navigateTo**
* **go 和 goRedirect会优先选择系统的历史栈，如果系统的不够了，才会使用自定义栈**

