function observer(obj) {
    for(let key in obj) {
        let interalValue = obj[key]
        let funcs = []
        Object.defineProperty(obj, key, {
            get: function() {
                if(window.__func && !funcs.includes(window.__func)) {
                    funcs.push(window.__func)
                }
                return interalValue
            },
            set: function(val) {
                interalValue = val;
                for(let fn of funcs) {
                    fn()
                }
            }
        })
    }
}

function autofn(fn) {
    window.__func = fn;
    fn()
    window.__func = null;
}