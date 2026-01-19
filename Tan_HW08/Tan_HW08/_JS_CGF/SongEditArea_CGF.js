function SongEditArea_CGF() {

    var ele = document.createElement("div");

    ele.innerHTML = `
        This example is my Song Edit Area where I have my own inputSpecs
        that specifies the fields that the user must enter for a song.
        There is also an implementation of my own editObj that provides
        initial values that will appear in the text boxes on this page.


        <div class="editAreaC"></div>
        <h4>Message Area</h4>
        <div class="msgAreaC"></div>
        `;

    var editArea = ele.getElementsByClassName("editAreaC")[0];
    var msgArea = ele.getElementsByClassName("msgAreaC")[0];

var userInputSpecs = [
{
    "prompt": "Song Title (Title must be in between 1..20) ",
    "fieldName": "songTitle",
    "dataType": "string",
    "isRequired": true, // required field
    "minLen": 1,
    "maxLen": 20
},
{
    "prompt": "Song Image (URL): ",
    "fieldName": "image",
    "dataType": "string",
    "isRequired": false, // empty string is OK
    "minLen": 1,
    "maxLen": 500
},
{
    "prompt": "Release Date (Must be a valid date in the format mm/dd/yyyy)",
    "fieldName": "releasedDate",
    "dataType": "date",
    "isRequired": true
},
{
    "prompt": "Total People In Song (Must be a value between 1..20) ",
    "fieldName": "totalPeople",
    "dataType": "number",
    "isRequired": true,
    "minVal": 1,
    "maxVal": 20
}
];

    var userToEdit = {
        "songTitle": "Drama",
        "image": "https://m.media-amazon.com/images/I/71ynS3Zz1GL._UF1000,1000_QL80_.jpg",
        "releasedDate": "2023-11-10", // yyyy/mm/dd
        "totalPeople": "4"
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

} // SongEditArea_CGF