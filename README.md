# cache
cache 3种常用缓存封装  
-cache.js:  
增删改查+设有效期：
```
     setCookie("test","tank",1800);   //设置cookie的值，生存时间半个小时-1800分钟
     alert(getCookie('test'));        //取得cookie的值，显示tank
     clearCookie("test");             //删除cookie的值
     alert(getCookie('test'));        //test对应的cookie值为空，显示为false.就是getCookie最后返的false值。
     clearAllCookies();               //清除所有cookie
```

localStorag：
```
     _local.set('access_token', '123456', 5000);//设置 5000=5秒
     setTimeout(function(){
      alert(_local.get('access_token'));//获取
      if(!_local.get('access_token')){
          _local.remove('access_token')//cookie可设expires自动删除，localStorage只能手动删除但可返回false
          _loacl.clear();  //清除全部
      }
     },5000)
```
sessionStorage:
```
    _session.set('access_token', '123456');
    alert(_session.get('access_token'));
    ......
```

-vcache.js:[是vue-cli专门响应式修改localStorage的方法]  
使用：
```
import '@/xxxx/vcache.js';
export default {
...
   data(){
     return{
        //在data中可自动响应，缓存修改后这里会自动更新
        count:localStorage.getItem('count')//取，变量名和缓存名必须一样，这都是count
    }
  },
  methods:{
   click:function(){
    localStorage.setItem('count',56);//存
}
}
...
}

```
