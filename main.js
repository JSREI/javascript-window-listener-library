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
     * @returns {Promise<void>}
     */
    async startWindowMonitor() {
        while (true) {
            await this.screenshotWindow();
            await this.sleep(100);
        }
    }

    async screenshotWindow() {
        for (let key in window) {
            // 已经存在的情况
            if (this.windowAttributeSet.has(key)) {
                continue;
            }

            // 触发新增事件
            for (let callback of this.windowListenerQueue) {
                callback(key)
            }

            this.windowAttributeSet.add(key);
        }
    }

    async sleep(mils) {
        return new Promise((resolve) => setTimeout(resolve, mils));
    }

}



