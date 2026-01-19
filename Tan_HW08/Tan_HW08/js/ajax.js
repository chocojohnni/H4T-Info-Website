function ajax (url, successCallBackFn, errorEle) {

    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP");
    } else {

        errorEle.innerHTML += "old browser -- ajax not supported";
        return;
    }

    console.log("ready to get content " + url);
    httpReq.open("GET", url); 

    httpReq.onreadystatechange = function () {

        if (httpReq.readyState === 4) {
            console.log("in ajax, status is " + httpReq.status);
            
            if (httpReq.status === 200) {
                console.log("in ajax, js object printed next");
                
                var obj = JSON.parse(httpReq.responseText);
                console.log(obj);

                successCallBackFn(obj);

            } else { 
                errorEle.innerHTML += "Error " + httpReq.status + "-" + httpReq.statusText +
                        " while attempting to read '" + url + "'";
            }
        }
    };

    httpReq.send(null);
    console.log("call initiated");

}