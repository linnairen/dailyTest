/**
 * 以下为自定义的ajax 如有雷同纯属巧合
 * @param {Object} obj
 * 以下为obj的属性
 * method 方法
 * url 地址
 * data 传输数据
 * dataType 数据类型（目前支持'json'）
 * async 是否异步
 * success 成功时执行函数(接受一个参数：返回的数据)
 * error 失败时执行函数（有待研究）
 */
function ajax(obj){
	var xmlhttp = null;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}
	else if(window.ActiveXObject){
		xmlhttp = new ActiveXObject();
	}
	if(xmlhttp != null){
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState==4){// 4 = "loaded"
			  	if(xmlhttp.status==200){// 200 = "OK"
			  		var data = xmlhttp.responseText;
			  		if(!obj.dataType ||( typeof(obj.dataType == 'string') && obj.dataType.toLowerCase() == 'json')){
			  			try{
			  				data = JSON.parse(data);
			  			}
			  			catch(e){
			  				throw new TypeError('the data is not a ' + (obj.dataType?obj.dataType:'json'));
			  			}
			  		}
			    	obj.success(data);
			    }
			  	else{
			    	obj.error();
			    }
			}
		};
		xmlhttp.open(obj.method,obj.url,obj.async);
		xmlhttp.send(obj.data);
	}
}