"use strict";
/* 
 * MakeEditArea expects a parameter object with the following inputs: 
 *     inputSpecs: array of objects (one object per field the user is supposed to type in)
 *     successCallBack:  consumer function to be called if the user clicks submit and all 
 *         inputs pass validation (Provider code will pass an object full of user inputs -- 
 *         to the consumer successCallBack function). 
 *     cancelCallBack: consumer function to be called if the user clicks cancel. 
 *     editObj: if provided, the field values in this object will be prefilled in the user input boxes. 
 *         (field names of editObj must match the field names specified in the inputSpecs).
 * 
 * MakeEditArea returns a div that contains a prompt, an input box, and a  possible error 
 * message for each input the user is supposed to enter.   It also has a submit button, a 
 * cancel button, and a "record level" message (e.g., "all good" or "please try again").
 * 
 * Here are the properties currently expected in inputSpec objects (however, you'll add/subtract
 * properties for your HW):
 *    "prompt": "User Email: ",   --> prompt for the input tag
 *    "fieldName": "userEmail",   --> fieldName to use when storing user's input 
 *    "dataType": "string",       --> type of data - you add your own types like date, or integer
 *    "isRequired": true,         --> NOTE: this is a boolean, no quotes.
 *    "maxLen": 50                --> maxLen, max # characters to be checked, if provided 
 */

function MakeEditArea({ inputSpecs, successCallBack, cancelCallBack, editObj = {} }) {

    // The first three parameter object properties must be provided. If the last one (editObj) 
    // is not provided, the default value is {} (empty object) and then all the user inputs
    // start out empty. If editObj is provided, MakeEditArea will pre-populate the user inputs
    // with values from editObj (if the editObj field names match the ones specified in 'inputSpecs').

    // defensive (provider style) programming. First check if the parameter obj has everything we need...
    // If not, return early with a great error message (avoids all the other errors you'd get due to 
    // insufficient input parameters).
    var errorMsg = "";

    if (!inputSpecs || !inputSpecs[0]) {
        errorMsg += "MakeEditArea did not receive a parameter property named 'inputSpecs'\n" +
            "that has at least one object (that defines one input field). <br/><br/>";
    }

    if (!successCallBack || !(successCallBack instanceof Function)) {
        errorMsg += "MakeEditArea did not receive a parameter property named 'successCallBack',\n" +
            "a Consumer function that will be called (passing an object full of user entered data)\n" +
            "if the user clicks 'Submit' and all the inputs validate. <br/><br/>";
    }

    if (!cancelCallBack || !(cancelCallBack instanceof Function)) {
        var errorMsg = "MakeEditArea did not receive a parameter property named 'cancelCallBack',\n" +
            "a Consumer function that will be called if the user clicks 'Cancel'.\n" +
            "(no input will be passed to the cancel call back function). <br/><br/>";
    }

    if (errorMsg.length > 0) {
        alert(errorMsg); // this would generally be a programmer error, not user error
        throw errorMsg; // this would generally stop execution

        // but if you do not want to throw the message, then return an error message div like this: 
        var errorDiv = document.createElement("div");
        errorDiv.innerHTML = errorMsg;
        return errorDiv; // early return, avoids errors we'd get due to insufficient input parameters. 
    }


    // Now that we know we have the inputs we need, begin making the editArea div.
    var editDiv = document.createElement("div");
    editDiv.classList.add("editArea");

    editDiv.innerHTML = `
    <div class="rowsC"></div>
    <button class="saveButtonC">Save</button>
    <button class="cancelButtonC">Cancel</button>
    <span class="recLevelMsgC"></span>
    `;

    var rows = editDiv.getElementsByClassName("rowsC")[0];
    var saveButton = editDiv.getElementsByClassName("saveButtonC")[0];
    var cancelButton = editDiv.getElementsByClassName("cancelButtonC")[0];
    var recLevelMsg = editDiv.getElementsByClassName("recLevelMsgC")[0];


    // create one row per input field. Each row shall contain prompt, input box, and container for 
    // error msg. 

    for (var spec of inputSpecs) { // with this syntax 'spec' is like inputSpecs[i]

        /* Example properties of spec: 
         *    "prompt": "User Email: ",      --> prompt for the input tag
         *    "fieldName": "userEmail",      --> fieldName for the input tag
         *    "dataType": "string",          --> dataType (string, date, decimal, or integer)
         *    "minLen": 1, // required field --> minLen 0 means optional, else means required
         *    "maxLen": 50                   --> maxLen will be checked if provided             */

        // This 'row' will hold the prompt, input, and error message. Style this as flexbox
        // for responsive design (single col in mobile, multi-col in desktop).
        var rowDiv = MakeTag({
            htmlTag: "div",
            parent: rows,
            cssClass: "row"
        }); // MakeTag possible inputs: { htmlTag, innerHTML, src, type, name, value, cssClass, parent }

        // Add prompt for field...
        MakeTag({ // dont need to reference this span tag, so no need to capture return value.
            htmlTag: "span",
            cssClass: "prompt",
            innerHTML: spec.prompt,
            parent: rowDiv
        });

        // use this as the "type" attribute of the input tag
        var textOrDate = "text";
        if (spec.dataType === "date") {
            textOrDate = "date";

            // format must be YYYY-MM-DD to correctly pre-fill the input date tag.
            console.log("Date value is " + editObj[spec.fieldName]);
        }

        // Add input tag for field. We need to access later, so save it right into the inputSpecs 
        // object that it relates to.
        spec.inputTag = MakeTag({
            htmlTag: "input",
            type: textOrDate,
            value: editObj[spec.fieldName] || "",
            parent: rowDiv
        });

        MakeTag({ // put a space after the textbox, before the error message
            htmlTag: "span",
            innerHTML: "&nbsp;",
            parent: rowDiv
        });

        // Add span tag to hold error Msg for this field. We need to access this later, so save it
        // right into the inputSpecs object that it relates to.
        spec.errorMsg = MakeTag({
            htmlTag: "span",
            cssClass: "error",
            parent: rowDiv
        });
    } //  for (var spec of inputSpecs)


    /* 
    Validate.js holds a global object named Validate that has the following 
    methods. All methods return a validation error message or an empty string 
    if validation passed.  
        Validate.Number = function (inputVal, isRequired) {...}
        Validate.Integer = function (inputVal, isRequired) {...}
        Validate.String = function (inputVal, isRequired, maxLen) {...}
        Validate.RequiredField = function (inputVal, isRequired) {...}
    */

    saveButton.onclick = function () {
        /* Here, you must add code to validate each input tag (check that it matches the specs 
        provided, e.g., correct data type). 
        
        The code currently only checks that each input 
        is as long as the minimum length requirement.) For every bad input, put an error 
        message (in that row). If any row has bad input, set the record level message like 
        "Please try again".
        */
        var allErrors = "";
        for (var spec of inputSpecs) {
            console.log("to validate " + spec.inputTag.value + " as a " + spec.dataType);
        
            if (spec.dataType === "string") {
                spec.errorMsg.innerHTML = Validate.String(spec.inputTag.value, spec.isRequired, spec.maxLen);
            } else if (spec.dataType === "number") {
                spec.errorMsg.innerHTML = Validate.Number(spec.inputTag.value, spec.isRequired, spec.min, spec.max);
            } else if (spec.dataType === "date") {
                if (spec.isRequired) {
                    spec.errorMsg.innerHTML = Validate.RequiredField(spec.inputTag.value, spec.isRequired);
                }
            }
            else {
                // Set an error message for an unknown data type
                spec.errorMsg.innerHTML = "Unknown data type";
            }
        
            allErrors += spec.errorMsg.innerHTML;
        }
        
        if (allErrors.length > 0) {
            recLevelMsg.innerHTML = "Please Try Again";
            return;
        } else {
            recLevelMsg.innerHTML = "Success !";
        }

        // Put user's validated input the editObj (the same object that may have been passed in). 
        for (var spec of inputSpecs) {
            editObj[spec.fieldName] = spec.inputTag.value;
        }

        // call the success call back function, passing to it the validated user input (in an object). 
        successCallBack(editObj);
    }; // submit onclick function 


    function clearAll() {
        // Blank out all input tags and also the record level message.
        for (var spec of inputSpecs) {
            spec.inputTag.value = "";
        }
        recLevelMsg.innerHTML = "";
    }

    cancelButton.onclick = function () {
        // Since the user is cancelling, clear out all inputs and record level msg. 
        clearAll();

        // inform the consumer that the user cancelled (let them do what they want about that). 
        cancelCallBack();
    };

    return editDiv;
}