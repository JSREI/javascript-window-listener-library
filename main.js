/**
 * window监控器，封装了监控相关的逻辑
 */
class WindowMonitor {

    constructor() {
        this.windowAttributeSet = new Set();
        this.windowListenerQueue = [];
    }

    /**
     * 增加一个window上新增或者删除变量时的监听器回调函数
     *
     * @param windowListener
     * @returns {Promise<void>}
     */
    async addWindowListener(windowListener) {
        this.windowListenerQueue.push(windowListener);
    }

    /**
     * 启动window监控器，其实就是异步移动一个while循环每隔 intervalMils 秒去检查一下window上是否有变量变化
     *
     * @param intervalMils 间隔多少毫秒检查一次，默认为300毫秒
     * @returns {Promise<void>}
     */
    async startWindowMonitor(intervalMils = 300) {

        // 第一次的认为是原生携带的，不触发事件
        await this.screenshotWindow(true);

        // 之后的才触发事件
        while (true) {
            await this.screenshotWindow(false);
            await this.sleep(intervalMils);
        }
    }

    /**
     *  对window上的变量做快照，如果有必要的话，则会与上一次的快照做diff尝试触发事件
     *
     * @param isInit 是否是第一次初始化，如果是初始化则只对window上的变量做快照，否则会与前一次的变量快照做diff尝试触发事件
     * @returns {Promise<void>}
     */
    async screenshotWindow(isInit) {
        for (let key in window) {

            // 变量已经存在的情况
            if (this.windowAttributeSet.has(key)) {
                continue;
            }

            // 触发变量新增事件
            if (!isInit) {
                for (let callback of this.windowListenerQueue) {
                    callback(key)
                }
            }

            // 把新增的变量记录一下
            this.windowAttributeSet.add(key);
        }
    }

    /**
     * 休眠给定的毫秒数
     *
     * @param mils 要休眠的毫秒数
     * @returns {Promise<number>}
     */
    async sleep(mils) {
        return new Promise((resolve) => setTimeout(resolve, mils));
    }

}



