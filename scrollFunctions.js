function scrollPage() {
    let scrollTop = readwebElement.scrollTop;
    let scrollHeight = readwebElement.scrollHeight;
    let clientHeight = readwebElement.clientHeight;
    if (scrollTop >= (scrollHeight - clientHeight)) {
        direction = -1; // 到达底部，改变滚动方向
    } else if (scrollTop <= 0) {
        direction = 1; // 到达顶部，改变滚动方向
    }
    // 模拟真人滚动，随机延迟
    let currentTime = Date.now();
    let delay = getRandomDelay(lastScrollTime, currentTime);
    lastScrollTime = currentTime;
    scrollQueue.push({ delay: delay, direction: direction });
    if (scrollQueue.length > MAX_SCROLL_QUEUE_SIZE) {
        scrollQueue.shift();
    }
    setTimeout(() => {
        processScrollQueue();
    }, delay);
}


function processScrollQueue() {
    if (scrollQueue.length > 0) {
        let scrollTask = scrollQueue.shift();
        readwebElement.scrollTop += speed * scrollTask.direction;
    }
}


function getRandomDelay(lastTime, currentTime) {
    let minDelay = 50; // 最小延迟，可调整
    let maxDelay = 500; // 最大延迟，可调整
    let baseDelay = 100; // 基础延迟，可调整
    let randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
    let timeSinceLastScroll = currentTime - lastTime;
    return Math.max(baseDelay, randomDelay - timeSinceLastScroll);
}


function scrollAndPauseCycle() {
    if (!isScrolling) return;
    intervalId = setInterval(scrollPage, 10);
    setTimeout(() => {
        clearInterval(intervalId);
        // 随机暂停 5 到 8 秒
        const pauseTime = Math.floor(Math.random() * 4) + 5;
        setTimeout(() => {
            if (isScrolling) {
                scrollAndPauseCycle();
            }
        }, pauseTime * 1000);
    }, 3000);
}
