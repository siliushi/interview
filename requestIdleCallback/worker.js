// 双重遍历，计算求和 耗时任务
function sumLoop(start, end) {
	let sum = 0
	for (let i = start; i < end; i++) {
		for (let j = start; j < end; j++) {
			tmp = sum;
			sum = tmp + i + j
		}
	}
	console.log(`从${start}到${end}自相相加和为：` + sum)
	return sum
}

self.onmessage = function(event) {
	var data = event.data;
	if(typeof data === 'number') {
		var result = sumLoop(0, data);
		self.postMessage(result);
	} else {
		const canvas = data.canvas
		const ctx = canvas.getContext('2d')
	}
};
