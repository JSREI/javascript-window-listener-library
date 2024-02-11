/**
 * window监控器，封装了监控相关的逻辑
 */
class WindowMonitor {

    // ----------------------------------------------------------------------------------------------------------------

    /**
     * window上增加了一个变量
     *
     * @type {string}
     */
    static WINDOW_EVENT_VARIABLE_ADD = "add";

    /**
     * window上删除了一个变量
     *
     * @type {string}
     */
    static WINDOW_EVENT_VARIABLE_DELETE = "delete";

    /**
     * window上某个变量的值发生了变化
     *
     * @type {string}
     */
    static WINDOW_EVENT_VARIABLE_VALUE_CHANGE = "value-change";

    // ----------------------------------------------------------------------------------------------------------------

    constructor() {
        this.windowAttributeMap = new Map();
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
        await this.#screenshotWindow(true);

        // 之后的才触发事件
        while (true) {
            await this.#screenshotWindow(false);
            await this.#sleep(intervalMils);
        }
    }

    /**
     *  对window上的变量做快照，如果有必要的话，则会与上一次的快照做diff尝试触发事件
     *
     * @param isInit 是否是第一次初始化，如果是初始化则只对window上的变量做快照，否则会与前一次的变量快照做diff尝试触发事件
     * @returns {Promise<void>}
     */
    async #screenshotWindow(isInit) {

        const newWindowAttributeMap = new Map();
        for (let key in window) {
            newWindowAttributeMap.set(key, window[key]);
        }

        // 如果不是第一次的话，则比对快照
        if (!isInit) {
            this.#diff(this.windowAttributeMap, newWindowAttributeMap);
        }

        // 最后，把快照整个替换一下
        this.windowAttributeMap = newWindowAttributeMap;

    }

    #diff(oldWindowAttributeMap, newWindowAttributeMap) {
        for (let key of newWindowAttributeMap.keys()) {

            const newValue = newWindowAttributeMap.get(key);

            // 新增变量，new map有但是old map没有
            if (!oldWindowAttributeMap.has(key)) {
                // 触发变量新增事件
                this.#applyEvent(WindowMonitor.WINDOW_EVENT_VARIABLE_ADD, key, newValue);
                continue;
            }

            // 新的map有，老的map也有，但是值并不一样，说明是值发生了变化
            const oldValue = oldWindowAttributeMap.get(key);
            if (newValue !== oldValue) {
                // 触发变量值变化的事件
                this.#applyEvent(WindowMonitor.WINDOW_EVENT_VARIABLE_VALUE_CHANGE, key, newValue, oldValue);
            }

        }

        // 删除变量
        for (let key of oldWindowAttributeMap.keys()) {
            if (newWindowAttributeMap.has(key)) {
                continue;
            }
            const oldValue = oldWindowAttributeMap.get(key);
            // 触发变量删除事件
            this.#applyEvent(WindowMonitor.WINDOW_EVENT_VARIABLE_DELETE, key, oldValue);
        }
    }

    /**
     * 触发变量事件，传递给事件回调函数的参数通过此函数的arguments传递，会被原样传递给回调函数
     */
    #applyEvent() {
        for (let callback of this.windowListenerQueue) {
            // 不能因为某个callback执行失败而影响到后续的callback的执行
            try {
                callback.apply(this, arguments);
            } catch (e) {
                console.error(e);
            }
        }
    }

    /**
     * 休眠给定的毫秒数
     *
     * @param mils 要休眠的毫秒数
     * @returns {Promise<number>}
     */
    async #sleep(mils) {
        return new Promise((resolve) => setTimeout(resolve, mils));
    }

}



