# JavaScript库： window监听器

# 一、 简介

用于监听window的变化，目前只有新增全局变量监控，最初是为了用在javascript hook库中实现对window变量的proxy功能。


# 二、Example

```js
   (async () => {

    const monitor = new WindowMonitor();
    await monitor.addWindowListener(key => {
        console.log(new Date(), key);
    });
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



















