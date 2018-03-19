var TemplateEngine = function(html, options) {
    //正则匹配出<%%>包裹的逻辑代码部分
    var re = /<%([^%>]+)?%>/g;
    //正则匹配出含有if|for|else|switch|case|break|{|}等关键字
	var reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
	//声明一个字符串code，用来保存我们最终输出的结果
	var code = 'var r=[];\n';
	//设置一个游标，用来遍历完我们传入的整个模板字符串
	var cursor = 0;
	//声明一个add函数，用来判断是js脚本部分，还是需要添加到数组中的字符串部分
    var add = function(line, js) {
        if(js === true){
           if(line.match(reExp)){
               code = code +   line + '\n'
           }else{
             code = code +  'r.push(' + line + ');\n'
           }
      }
      else{
        if(line !== ''){
           code = code + 'r.push("' + line.replace(/"/g, '\\"') + '");\n'; //引号添加转义符
        }else{
            code = code + ''
        }
      }
     return add
    }
    
      while( match = re.exec(html) ) {
         var matchIdx = match.index;//使用re正则匹配，在模板字符串中匹配到的第一个部分的最后一个字符的下一个字符的下标
         var matchPart = html.slice(cursor,matchIdx);//从模板字符串中截取出下标从cursor，到matchIdx的部分
         add(matchPart);//只传了第一参数，line
         add(match[1], true); //第二个参数设为true的话，直接进入if(js===true)这个判断中
         cursor = match.index + match[0].length; //游标更新
    }
    var rest = html.substr(cursor, html.length - cursor);//匹配结束后，模板字符串中最后剩余的部分
    add(rest);//这一部分也需要进入add函数中判断
    code = code +  'return r.join("");';//最后添加返回语句
    code = code.replace(/[\r\t\n]/g, '');//去除code字符串中的制表符，回车符和换行符等，使代码看起来更加简洁
    return new Function(code).apply(options); //将code放入Function()函数中运行，并且将code中的变量作用域绑定到data上。
}
