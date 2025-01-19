// 滚动页面函数，修改为滚动 Readweb 元素
function scrollPage() {
    console.log('scrollPage 函数被调用');
    let readwebElement = document.getElementById('Readweb');
    if (!readwebElement) {
        console.error('未找到 id 为 Readweb 的元素');
        return;
    }
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
function scrollLoop() {
    console.log('scrollLoop 函数被调用');
    while (isScrolling) {
        // 正常滚动 5 秒
        intervalId = setInterval(scrollPage, 10);
        setTimeout(() => {
            clearInterval(intervalId);
            // 暂停 10 秒
            setTimeout(() => {
                // 随机加快速度
                let randomSpeedFactor = Math.random() * 2 + 1; // 1 到 3 之间的随机数
                speed = originalSpeed * randomSpeedFactor;
                // 以新速度滚动 4 秒
                intervalId = setInterval(scrollPage, 10);
                setTimeout(() => {
                    clearInterval(intervalId);
                    // 恢复原始速度
                    speed = originalSpeed;
                    // 以原始速度滚动 1 秒
                    intervalId = setInterval(scrollPage, 10);
                    setTimeout(() => {
                        clearInterval(intervalId);
                        // 随机暂停不低于 20 秒且不超过 1 分钟
                        let randomPauseTime = Math.random() * 40000 + 20000;
                        setTimeout(() => {
                            if (isScrolling) {
                                scrollLoop();
                            }
                        }, randomPauseTime);
                    }, 1000);
                }, 4000);
            }, 10000);
        }, 5000);
    }
}
