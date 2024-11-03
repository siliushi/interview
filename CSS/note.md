https://cloud.tencent.com/developer/article/1989580

https://segmentfault.com/a/1190000045269125

# 三种隐藏

|  | display: none     |  visibility: hidden     | opacity: 0     |
| -------- | -------- | -------- | -------- |
| 是否生成盒子 | X | √ | √ |
| 是否占据空间 | X | √ | √ |
| 是否可以交互 | X | X | √ |
| 是否参与reflow | X | √ | √ |
| 是否参与repaint | X | X | √ |

# 颜色交融
先blur在contrast

# 多行省略
display: box;
overflow:hidden;
box-orient: vertical;
line-clamp: