/**
 * 
 * @param {Function[]} tasks 
 * @param {Number} paralleCount 
 */
function paralleTask(tasks, paralleCount = 2) {
    return new Promise(resolve => {
        if(this.length === 0) {
            resolve();
            return;
        }
        let nextIndex = 0;
        let finnshCount = 0;
        function _run() {
            // 运行下一个任务
            const task = tasks[nextIndex];
            nextIndex++;
            task().then(() => {
                // 记录完成的任务
                finnshCount++;
                // 任务完成之后
                if(nextIndex < tasks.length) {
                    // 还有下一个任务
                    _run();
                    return
                }
                if(finnshCount === tasks.length) {
                    resolve()
                }
            });
        }
        for(let i = 0; i < paralleCount && i < tasks.length; i++) {
            _run();
        }
    })
}
export default paralleTask;