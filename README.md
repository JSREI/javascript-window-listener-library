# javascript逆向开发基础组件： window监听器

# 一、 简介

用于监听window的变化，目前只有新增全局变量监控，最初是为了用在javascript hook库中实现对window变量的proxy功能。

# 二、Example

```js
(async () => {

    const monitor = new WindowMonitor();
    // 在window新增变量时会触发此处传入的Listener函数，Listener函数可以有多个 
    await monitor.addWindowListener(key => {
        console.log(new Date(), key);
    });
    // 启动监控器，其实就是个while循环不断的检查window上是否有新增变量 
    await monitor.startWindowMonitor();

})();

const chars = "ABCDEFGHJKMNPQRSTWXYZ"

function randomString(length) {
    length = length || 100;
    const charArray = [];
    for (let i = 0; i < length; i++) {
        charArray.push(chars.charAt(Math.floor(Math.random() * chars.length)));
    }
    return charArray.join("");
}

function genGlobalVars() {
    window[randomString(40)] = randomString(6);
    setTimeout(genGlobalVars, Math.random() * 10)
}

setTimeout(() => {
    genGlobalVars();
}, Math.random() * 10)

```

# 三、原理

其实原理简单粗暴，就是每隔一段时间遍历window对其所有属性做一个快照，然后前后快照做diff，就能够找出来新增的变量或者删除的变量，对于第一个快照会认为是初始化，这样就能够把默认的属性给识别出来不触发新增事件。



















