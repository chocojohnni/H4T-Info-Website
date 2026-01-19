function DptEditArea_CGF() {

    var ele = document.createElement("div");

    ele.innerHTML = `
        This example is my Department Edit Area where I implement
        my own inputSpecs and editObj. This is my second edit area
        where the fields aren't prepopulated.

        <div class="editAreaC"></div>
        <h4>Message Area</h4>
        <div class="msgAreaC"></div>
        `;

    var editArea = ele.getElementsByClassName("editAreaC")[0];
    var msgArea = ele.getElementsByClassName("msgAreaC")[0];

var userInputSpecs = [
{
    "prompt": "Department Name (Name must be in between 1..20) ",
    "fieldName": "dptName",
    "dataType": "string",
    "isRequired": true, // required field
    "maxLen": 20
},
{
    "prompt": "Department Image (URL): ",
    "fieldName": "image",
    "dataType": "string",
    "isRequired": false, // empty string is OK
    "minLen": 1,
    "maxLen": 500
},
{
    "prompt": "Department Origin Date (Date format must be mm/dd/yyyy) ",
    "fieldName": "dptOriginDate",
    "dataType": "date",
    "isRequired": true
},
{
    "prompt": "Total People In Department (Value must be 1..20) ",
    "fieldName": "totalPeople",
    "dataType": "number",
    "isRequired": true, 
    "minVal": 1,
    "maxVal": 20
}
];

    var userToEdit = {
        "dptName": "",
        "image": "",
        "dptOriginDate": "",
        "totalPeople": ""
    };

    function success(inpObj) {
        msgArea.innerHTML += "We will process your request with these values:<br/>";
        for (var propName in inpObj) {
            msgArea.innerHTML += "&nbsp; &nbsp; " + propName + ": " +
                inpObj[propName] + "<br/>";
        }
        msgArea.innerHTML += "<br/>";

        msgArea.innerHTML += "To show that passing objects in JS is 'call by reference', " +
            "here is the original 'userToEdit' object (that also got changed):<br/>";
        for (propName in userToEdit) {
            msgArea.innerHTML += "&nbsp; &nbsp; " + propName + ": " +
                userToEdit[propName] + "<br/>";
        }
        msgArea.innerHTML += "<br/>";
    }

    function cancel() {
        msgArea.innerHTML += "Sorry that you decided to cancel.<br/><br/>";
    }

    var component = MakeEditArea({
        inputSpecs: userInputSpecs,
        successCallBack: success,
        cancelCallBack: cancel,
        editObj: userToEdit
    });
    editArea.appendChild(component);

    return ele;

} // DptEditArea_CGF