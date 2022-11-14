// 基本工具

/**
 * 合并对象 obj1 <--add-- obj2
 * @param {对象1} obj 
 * @param {对象2} obj2
 * @param {过滤元素} filter
 */
export const mergeObject = (obj, obj2, filter) => {
    for (let key in obj2) {
        if (filter != null && filter.includes(key))
            continue
        if (obj2[key] != null && obj2[key] !== '') {
            obj[key] = obj2[key]
        }
    }
}

export const createId = () => {
    let date = new Date();
    let rund = Math.ceil(Math.random() * 9)
    let id = date.getFullYear() + ''
        + (date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth())
        + '' + date.getDate()
        + '' + date.getHours()
        + '' + date.getMinutes()
        + '' + date.getSeconds()
        + '' + date.getMilliseconds()
        + '' + rund;
    return id
}

//hex -> rgb
export const hexToRgb = (hex) => {
    return 'rgb(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5))
        + ',' + parseInt('0x' + hex.slice(5, 7)) + ')';
}

//hex -> rgba
export const hexToRgba = (hex, opacity) => {
    return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ','
        + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
}

/**
 * Date转时间字符串
 * @param {*} now Date对象
 * @returns 时间字符串
 */
export const formatDate = (now) => {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" +
        (month < 10 ? '0' + month : month) + "-" +
        (date < 10 ? '0' + date : date) + " " +
        (hour < 10 ? '0' + hour : hour) + ":" +
        (minute < 10 ? '0' + minute : minute) + ":" +
        (second < 10 ? '0' + second : second);
}