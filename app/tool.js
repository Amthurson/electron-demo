module.exports = {
    deepClone(obj) {
        // 定义一个变量 并判断是数组还是对象
        var objClone = Array.isArray(obj) ? [] : {}
        if (obj && typeof obj === 'object' && obj != null) {
        // 判断obj存在并且是对象类型的时候 因为null也是object类型，所以要单独做判断
        for (var key in obj) {
            // 循环对象类型的obj
            if (obj.hasOwnProperty(key)) {
            // 判断obj中是否存在key属性
            if (obj[key] && typeof obj[key] === 'object') {
                // 判断如果obj[key]存在并且obj[key]是对象类型的时候应该深拷贝，即在堆内存中开辟新的内存
                objClone[key] = deepClone(obj[key])
            } else {
                // 否则就是浅复制
                objClone[key] = obj[key]
            }
            }
        }
        }
        return objClone
    }
}