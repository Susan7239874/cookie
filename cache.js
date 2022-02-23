//设置cookie
function setCookie(name, value, seconds) {
    seconds = seconds || 0;   //seconds有值就直接赋值，没有为0，这个根php不一样。
    var expires = "";
    if (seconds != 0 ) {      //设置cookie生存时间
        var date = new Date();
        date.setTime(date.getTime()+(seconds*1000));
        expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
}

//取得cookie
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');    //把cookie分割成组
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];                      //取得字符串
        while (c.charAt(0)==' ') {          //判断一下字符串有没有前导空格
            c = c.substring(1,c.length);      //有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) == 0) {       //如果含有我们要的name
            return unescape(c.substring(nameEQ.length,c.length));    //解码并截取我们要值
        }
    }
    return false;
}

//清除cookie
function clearCookie(name) {
    setCookie(name, "", -1);
}
function clearAllCookies(){
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
    // window.location.href = "index.html";
}
/*
调用cookie上面方法：
 setCookie("test","tank",1800);   //设置cookie的值，生存时间半个小时-1800分钟
 alert(getCookie('test'));        //取得cookie的值，显示tank
 clearCookie("test");             //删除cookie的值
 alert(getCookie('test'));        //test对应的cookie值为空，显示为false.就是getCookie最后返的false值。
*/

var _local = {
    //存储,可设置过期时间
    set(key, value, expires) {
        let params = { key, value, expires };
        if (expires) {
            // 记录何时将值存入缓存，毫秒级
            var data = Object.assign(params, { startTime: new Date().getTime() });
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            if (Object.prototype.toString.call(value) == '[object Object]') {
                value = JSON.stringify(value);
            }
            if (Object.prototype.toString.call(value) == '[object Array]') {
                value = JSON.stringify(value);
            }
            localStorage.setItem(key, value);
        }
    },
    //取出
    get(key) {
        let item = localStorage.getItem(key);
        // 先将拿到的试着进行json转为对象的形式
        try {
            item = JSON.parse(item);
        } catch (error) {
            // eslint-disable-next-line no-self-assign
            item = item;
        }
        // 如果有startTime的值，说明设置了失效时间
        if (item && item.startTime) {
            let date = new Date().getTime();
            // 如果大于就是过期了，如果小于或等于就还没过期
            if (date - item.startTime > item.expires) {
                localStorage.removeItem(name);
                return false;
            } else {
                return item.value;
            }
        } else {
            return item;
        }
    },
    // 删除
    remove(key) {
        localStorage.removeItem(key);
    },
    // 清除全部
    clear() {
        localStorage.clear();
    }
}
/**
 * localStorage
 * @调用：_local.set('access_token', '123456', 5000);//5000=5秒
 * @调用：_local.get('access_token');
 */

/**
 * sessionStorage
 */
var _session = {
    get: function (key) {
        var data = sessionStorage[key];
        if (!data || data === "null") {
            return null;
        }
        return JSON.parse(data).value;
    },
    set: function (key, value) {
        var data = {
            value: value
        }
        sessionStorage[key] = JSON.stringify(data);
    },
    // 删除
    remove(key) {
        sessionStorage.removeItem(key);
    },
    // 清除全部
    clear() {
        sessionStorage.clear();
    }
}

// export { _local, _session ,setCookie,getCookie}


