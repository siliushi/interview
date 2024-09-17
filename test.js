function bigSum(a, b) {
    let result = '';
    const len = Math.max(a.length, b.length);
    a = a.padStart(len, '0')
    b = b.padStart(len, '0')
    let increase = 0;
    for(let i = len - 1; i >= 0; i--) {
        const item = Number(a[i]) + Number(b[i]) + Number(increase)
        result = item % 10 + result;
        console.log(item % 10)
        increase = item/10| 0;
    }
    if(increase) {
        result = increase + result;
    }
    return result;
}
console.log(bigSum('2424242424242424234534535', '7567575756756757575675756757'))