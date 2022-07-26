/**
 * window监控器，封装了监控相关的逻辑
 */
class WindowMonitor {

    constructor() {
        this.windowAttributeSet = new Set();
        this.windowListenerQueue = [];
    }

    async addWindowListener(windowListener) {
        this.windowListenerQueue.push(windowListener);
    }

    /**
     * 启动window监控器
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

    async screenshotWindow(isInit) {
        for (let key in window) {

            // 已经存在的情况
            if (this.windowAttributeSet.has(key)) {
                continue;
            }

            // 触发新增事件
            if (!isInit) {
                for (let callback of this.windowListenerQueue) {
                    callback(key)
                }
            }

            this.windowAttributeSet.add(key);
        }
    }

    async sleep(mils) {
        return new Promise((resolve) => setTimeout(resolve, mils));
    }

}



