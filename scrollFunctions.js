// 开始滚动函数
function startScrolling() {
    if (!isScrolling) {
        isScrolling = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        // 启动滚动循环
        scrollLoop();
    }
}

// 停止滚动函数
function stopScrolling() {
    if (isScrolling) {
        isScrolling = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        clearInterval(intervalId);
    }
}

// 滚动页面函数，修改为滚动 Readweb 元素
function scrollPage() {
    let scrollTop = readwebElement.scrollTop;
    let scrollHeight = readwebElement.scrollHeight;
    let clientHeight = readwebElement.clientHeight;
    if (scrollTop >= (scrollHeight - clientHeight)) {
        direction = -1; // 到达底部，改变滚动方向
    } else if (scrollTop <= 0) {
        direction = 1; // 到达顶部，改变滚动方向
    }
    readwebElement.scrollTop += speed * direction;
}

// 滚动循环函数
async function scrollLoop() {
    while (isScrolling) {
        // 正常滚动 5 秒
        intervalId = setInterval(scrollPage, 10);
        await new Promise(resolve => setTimeout(resolve, 5000));
        clearInterval(intervalId);

        // 暂停 10 秒
        await new Promise(resolve => setTimeout(resolve, 10000));

        // 随机加快速度
        let randomSpeedFactor = Math.random() * 2 + 1; // 1 到 3 之间的随机数
        speed = originalSpeed * randomSpeedFactor;
        // 以新速度滚动 4 秒
        intervalId = setInterval(scrollPage, 10);
        await new Promise(resolve => setTimeout(resolve, 4000));
        clearInterval(intervalId);

        // 恢复原始速度
        speed = originalSpeed;
        // 以原始速度滚动 1 秒
        intervalId = setInterval(scrollPage, 10);
        await new Promise(resolve => setTimeout(resolve, 1000));
        clearInterval(intervalId);

        // 随机暂停不低于 20 秒且不超过 1 分钟
        let randomPauseTime = Math.random() * 40000 + 20000;
        await new Promise(resolve => setTimeout(resolve, randomPauseTime));
    }
}