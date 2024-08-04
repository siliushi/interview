# 9种数据结构
列表 list
队列 queue 双向队列
栈 stack
字典 dictionary
链表 listnode 单链表、双向链表、循环链表
散列 hashtable
集合 set 元素唯一
树 tree
图 graph



# 动态规划
与分治模式的区别
有时被认为是一种与递归相反的技术。递归是从顶部开始将问题分解，通过解决掉所有分解出小问题的方式，来解决整个问题。动态规划解决方案从底部开始解决问题，将所有小问题解决掉，然后合并成一个整体解决方案，从而解决掉整个大问题。
许多使用递归去解决的编程问题，可以重写为使用动态规划的技巧去解决。动态规划方案通常会使用一个数组来建立一张表，用于存放被分解成众多子问题的解。当算法执行完毕，最终的解将会在这个表中很明显的地方被找到，接下来看看斐波那契数列的例子。
递归，备忘录模式
function feibona(n) {
    if(n < 2) return 1;
    return feibona1(n-1) + feibona1(n-2);
}
很明显有太多值在递归调用中被重新计算。如果编译器可以将已经计算的值记录下来，函数的执行效率就不会如此差。
动态规划
function dynFib(n) {
    var val = [];
    for (var i = 0; i <= n; ++i) {
        val[i] = 0;
    }
    if (n == 1 || n == 2) {
        return 1;
    }
    else {
        val[1] = 1;
        val[2] = 2;
        for (var i = 3; i <= n; ++i) {
            val[i] = val[i-1] + val[i-2];
        }
        return val[n-1];
    }
}

迭代
function iterFib(n) {
    var last = 1;
    var nextLast = 1;
    var result = 1;
    for (var i = 2; i < n; ++i) {
        result = last + nextLast;
        nextLast = last;
        last = result;
    }
    return result;
}

https://www.bilibili.com/video/BV1Qb421Y7V6/?vd_source=8e6dfd9fb6e70ce8104f69d8d3ea1703
https://www.bilibili.com/video/av294603968/?vd_source=8e6dfd9fb6e70ce8104f69d8d3ea1703


# 贪心算法
是一种以寻找“优质解”为手段从而达成整体解决方案的算法。这些优质的解决方案称为局部最优解，将有希望得到正确的最终解决方案，也称为全局最优解。“贪心”这个术语来自于这些算法无论如何总是选择当前的最优解这个事实。通常，贪心算法会用于那些看起来近乎无法找到完整解决方案的问题，然而，出于时间和空间的考虑，次优解也是可以接受的。