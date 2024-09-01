var user = {
    name: '测试',
    birth: '1990-1-1'
}
observer(user)
function showFirstName() {
    document.querySelector('#firstname').textContent = '姓：' + user.name[0]
}

function showLastName() {
    document.querySelector('#lastname').textContent = '名：' + user.name[1]
}
autofn(showFirstName)
autofn(showLastName)

user.name = '马武'