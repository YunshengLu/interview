function myAjax (options){
    const xml = new XMLHttpRequest();
    const url = options.url;
    const type = (options.type || "GET").toUpperCase();
    const sendData = options.data; 
    xml.open(type,url,true);
    if(type==="GET"){
        xml.send();
    }else{
        xml.send(sendData);
    }
    xml.onreadystatechange=function(){
        if(xml.readyState===4){
            if(xml.status>=200&& xml.status<300){
                options.success &&options.success(xml.responseText,xml.responseXML);
            }else{
                options.error &&options.error(xml.status);
            }
        }
    };
    myAjax({
        type:"get",
        dataType:"json",
        data:"",
        url:"",
        success:function(text,xml){},
        error:function(status){}
    });
    
    
}