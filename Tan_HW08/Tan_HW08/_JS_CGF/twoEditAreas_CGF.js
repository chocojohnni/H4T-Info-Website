function twoEditAreas_CGF() {  
    var ele = document.createElement("div");
    ele.appendChild(SongEditArea_CGF());
    ele.appendChild(DptEditArea_CGF()); 
    return ele;
}