# javascript逆向开发基础组件： window监听器

# 一、 简介

用于监听`window`上的全局变量的变化，目前支持的事件类型：

- 新增变量
- 删除变量
- 变量的值被修改 

最初是为了用在`javascript hook`库中实现对`window`变量的`proxy`功能。

# 二、示例代码 

```js

    function eventCallback() {
        console.log(new Date(), JSON.stringify(arguments));
    }

    (async () => {

        const monitor = new WindowMonitor();
        await monitor.addWindowListener(eventCallback);
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
        const variableName = randomString(2);
        const variableValue = randomString(10);
        if (Math.random() < 0.3) {
            delete window[variableName];
        } else {
            window[variableName] = variableValue;
        }
        setTimeout(genGlobalVars, Math.random() * 100)
    }

    setTimeout(() => {
        genGlobalVars();
    }, Math.random() * 100)
```

效果大概是这样子的：

```bash
Mon Feb 12 2024 01:21:03 GMT+0800 (中国标准时间) '{"0":"add","1":"FJ","2":"XXHPASGPNM"}'
Mon Feb 12 2024 01:21:03 GMT+0800 (中国标准时间) '{"0":"add","1":"TR","2":"GQRFMERYPC"}'
Mon Feb 12 2024 01:21:03 GMT+0800 (中国标准时间) '{"0":"add","1":"GA","2":"KGKZFMJFPQ"}'
Mon Feb 12 2024 01:21:03 GMT+0800 (中国标准时间) '{"0":"add","1":"DM","2":"DDCHTFFXKC"}'
Mon Feb 12 2024 01:21:03 GMT+0800 (中国标准时间) '{"0":"add","1":"EN","2":"QACZMJQWHS"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"YR","2":"DGMXDYJBPK"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"FS","2":"CTGYPNZFYM"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"WW","2":"DQKTHTYETA"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"KR","2":"GHMBFNJMDR"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"MM","2":"RHEMJXJSWQ"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"WZ","2":"SGMPJZWAGT"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"WE","2":"YSAHHBKZHD"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"delete","1":"EW","2":"XRZKANRJYK"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"GG","2":"CCCKHTDKJM"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"FP","2":"EJHFACQNJT"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"GM","2":"QSDYMWTZAJ"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"CH","2":"WRAETDQZWP"}'
Mon Feb 12 2024 01:21:04 GMT+0800 (中国标准时间) '{"0":"add","1":"DY","2":"WTJRMKMCTX"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"value-change","1":"FJ","2":"TPDKFFKHYP","3":"XXHPASGPNM"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"XW","2":"BMJETGFMYG"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"EW","2":"KRWCHSZDJG"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"GK","2":"ZCEJAQTXRF"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"QA","2":"XXKFHYGMTE"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"SG","2":"CJBAGADFYN"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"GJ","2":"XQHWWHBDDC"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"JF","2":"YQSSKTFNGY"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"MG","2":"EGXQANXHFZ"}'
Mon Feb 12 2024 01:21:05 GMT+0800 (中国标准时间) '{"0":"add","1":"SY","2":"ZXNGRKKQWQ"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"FH","2":"MEZHWWYCTW"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"HT","2":"TYHNWZTZJP"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"JY","2":"JBXCGQNCAE"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"value-change","1":"GJ","2":"XMGTXTAGXF","3":"XQHWWHBDDC"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"SH","2":"SFPEBHHAMG"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"MP","2":"YTWZZYCZJP"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"SQ","2":"BNZCCECGMT"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"BN","2":"GXFTFYKHQH"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"value-change","1":"QA","2":"MSSZRDFSBR","3":"XXKFHYGMTE"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"ZP","2":"ZCAPWBWSEZ"}'
Mon Feb 12 2024 01:21:06 GMT+0800 (中国标准时间) '{"0":"add","1":"WN","2":"GZNCTBTQHN"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"QP","2":"YSRSPGSCSP"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"BB","2":"QQQSPZNEEP"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"YD","2":"YQXGXWHECD"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"CB","2":"GGWFNKPGDP"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"CR","2":"YMZRBKYZPW"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"delete","1":"SG","2":"CJBAGADFYN"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"delete","1":"JF","2":"YQSSKTFNGY"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"value-change","1":"WZ","2":"CANXENXHZT","3":"SGMPJZWAGT"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"ZC","2":"GBQCNPRMKT"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"RW","2":"PMBSMJNWNF"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"PH","2":"BCSKPSRXHN"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"value-change","1":"SH","2":"ZFXDQACCXN","3":"SFPEBHHAMG"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"CS","2":"PFEKTSZRSC"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"QQ","2":"FTWNMGZMQJ"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"MW","2":"ZWARCYJXYJ"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"BG","2":"NNDQKGWSEW"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"FB","2":"WSRGMGAANN"}'
Mon Feb 12 2024 01:21:07 GMT+0800 (中国标准时间) '{"0":"add","1":"ND","2":"CEHRCZHFAZ"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"value-change","1":"GM","2":"BHGSSSQQZC","3":"QSDYMWTZAJ"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"YK","2":"RTFTKQANRK"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"SR","2":"QEXKTYCXTC"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"BZ","2":"YZZXJPDPJQ"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"HM","2":"EKCRGTBQWF"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"value-change","1":"BZ","2":"EAZAJRNNDB","3":"YZZXJPDPJQ"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"YJ","2":"YRDFRAHYEQ"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"CK","2":"ZCZQHDCWXD"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"EC","2":"JKSHFGMQNA"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"KF","2":"SDEQJPKBXH"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"JN","2":"FSAQKDBDTT"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"add","1":"MX","2":"YJNXZNPGCZ"}'
Mon Feb 12 2024 01:21:08 GMT+0800 (中国标准时间) '{"0":"delete","1":"SR","2":"QEXKTYCXTC"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"value-change","1":"EW","2":"CQJCQCZASD","3":"KRWCHSZDJG"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"PX","2":"ZFKJJGSSKF"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"EY","2":"XFBJSTQJDY"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"NG","2":"TNRWJWAAEP"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"DR","2":"FSNPRPDMYP"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"SB","2":"ESZEGWGJCA"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"BP","2":"NKGAFNPTPG"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"NK","2":"MAQHETWQET"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"RH","2":"QSDXRYMWKX"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"PQ","2":"HSGNRDKTMJ"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"delete","1":"HM","2":"EKCRGTBQWF"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"value-change","1":"NG","2":"QPMAYAXGTH","3":"TNRWJWAAEP"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"BA","2":"EBNTSBMZNQ"}'
Mon Feb 12 2024 01:21:09 GMT+0800 (中国标准时间) '{"0":"add","1":"JQ","2":"NWFMSATFDH"}'
```

测试用例详见`test.html`文件，或者在线预览效果，点进下面的链接然后打开开发者工具查看：

[https://htmlpreview.github.io/?https://github.com/JSREI/javascript-window-listener-library/blob/main/window-monitor-bypass/test.html](https://htmlpreview.github.io/?https://github.com/JSREI/javascript-window-listener-library/blob/main/window-monitor-bypass/test.html)

# 三、原理

其实原理简单粗暴，就是每隔一段时间遍历`window`对其所有属性做一个快照，然后前后快照做`diff`，就能够找出来新增的变量或者删除的变量，对于第一个快照会认为是初始化，这样就能够把默认的属性给识别出来不触发新增事件。



















