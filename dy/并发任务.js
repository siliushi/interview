async function executeTasksConcurrentlyWithLimit(tasks, limit) {
    const results = [];
    const executing = new Set();

    const enqueue = async (task) => {
        const promise = task().then(result => {
            results.push(result);
            executing.delete(promise);
        });
        executing.add(promise);

        if (executing.size >= limit) {
            await Promise.race(executing); // 等待其中一个任务完成
        }
    };

    await Promise.all(tasks.map(task => enqueue(task)));

    return results;
}

// 示例用法
const task1 = () => new Promise(resolve => setTimeout(() => resolve('Task 1 completed'), 1000));
const task2 = () => new Promise(resolve => setTimeout(() => resolve('Task 2 completed'), 500));
const task3 = () => new Promise(resolve => setTimeout(() => resolve('Task 3 completed'), 2000));
const task4 = () => new Promise(resolve => setTimeout(() => resolve('Task 4 completed'), 1500));

executeTasksConcurrentlyWithLimit([task1, task2, task3, task4], 2)
    .then(results => console.log('All tasks completed:', results))
    .catch(error => console.error('Some tasks failed:', error));




/**
 * 
 * @param {Function[]} tasks 
 * @param {Number} paralleCount 
 */
function paralleTask(tasks, paralleCount = 2) {
    return new Promise(resolve => {
        if(tasks.length === 0) {
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