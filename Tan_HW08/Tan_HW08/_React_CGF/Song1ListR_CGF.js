"use strict"; // prevent browser from auto-declaring (globally) mispelled variables.

const { useState, useEffect } = React;

function Song1ListR_CGF() {

    // Common React pattern. Display "...Loading..." until you have all the data you need. 
    // set isLoading to false when you have all the data you need. 
    const [isLoading, setIsLoading] = React.useState(true);

    // this is the data initially read (just once) from the DB.
    const [songListSV, setSongListSV] = React.useState([]); // car List react state variable

    // if there is an ajax error (not able to read the data, set this state variable)
    const [error, setError] = React.useState(null);

    console.log("running Song1ListR_CGF...");

    // useEffect takes two params. The first param is the function to be run. 
    // The second param is a list of state variables that (if they change) will 
    // cause the function (first param) to be run again.
    // RUN ONCE PATTERN: With [] as 2nd param, it runs the 1st param (fn) just once. 
    React.useEffect(() => {

        // ajax_alt takes three parameters: the URL to read, Success Fn, Failure Fn.
        ajax(

            "json/h4t.json", // URL for AJAX call to invoke

            // success function (anonymous)
            function (songListData) {   // success function gets obj from ajax_alt

                console.log("The next line shows what data was read from the json file.");
                console.log(songListData);
                setSongListSV(songListData);
                setIsLoading(false); // now component can be rendered
            },

            // failure function (also anonymous)
            function (msg) {       // failure function gets error message from ajax_alt
                console.log("Ajax error encountered: " + msg);
                setError(msg);
                setIsLoading(false); // allow the component to be rendered
            }
        );
    }, []);


    if (isLoading) {
        console.log("initial rendering, Data not ready yet...");
        return <div> ...Loading... </div>
    }

    if (error) {
        console.log(`there must have been an ajax error (e.g., bad URL), 
            or database error (e.g., connection error because not tunnelled in)...`);
        return <div>Error: {error} </div>;
    }

    return (
        <MakeSongListR songList={songListSV} title="First Song List (from JSON File)" />
    )
};