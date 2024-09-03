var user = {
    name: '测试',
    age: 30
}
observer(user)
function showFirstName() {
    document.querySelector('#firstname').textContent = '姓：' + user.name[0]
}

function showLastName() {
    document.querySelector('#lastname').textContent = '名：' + user.name[1]
}
function showAge() {
    console.log(11111)
    document.querySelector('#age').textContent = '年龄：' + user.age
}
autofn(showFirstName)
autofn(showLastName)
autofn(showAge)
user.name = '马武'
