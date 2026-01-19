"use strict";

function SlideShow_AJAX_CGF() {
    var ele = document.createElement("div");

    ele.innerHTML = `
      <style>
        .ssFlex {
          display: flex;
          flex-direction: row;
          justify-content: center; 
          align-items: center;    
        }
        .ssFlex .slideShow {
          width: 31%;
          box-sizing: border-box;
          text-align: center;
          margin: 0 1%;
        }
      </style>

      <div class="firstDiv"></div>
      <div class="secondDiv"></div>
      <div class="thirdDiv"></div>
    `;
    ele.classList.add("ssFlex");

    var firstDiv = ele.querySelector(".firstDiv");
    var secondDiv = ele.querySelector(".secondDiv");
    var thirdDiv = ele.querySelector(".thirdDiv");

    let songSlideData = [];

    // Fetch JSON data and create slides
    ajax("json/h4t.json", function (data) {
        console.log("H4T JSON Loaded:", data);
        if (!data || !Array.isArray(data)) return;

        songSlideData = data.map(song => ({
            image: song.image || "pics_slideShow/nothing.png", 
            caption: song.songTitle || song.song || "Unknown Song", 
            info: `Artist: ${song.songArtist || "Unknown"}\nPeople: ${song.people || "N/A"}\nOffice Members: ${song.officeMembers || "N/A"}\nTeam H: ${song.teamH || "N/A"}\nTeam T: ${song.teamT || "N/A"}`
        }));

        if (songSlideData.length > 0) {
            var songSlideshow = MakeSlideShow({ picList: songSlideData, ssTitle: "H4T Song List" });
            secondDiv.appendChild(songSlideshow);
        }
    });

    ajax("json/department.json", function (deptData) {
        console.log("Department JSON Loaded:", deptData);
    
        // Ensure valid data
        if (!deptData || !Array.isArray(deptData)) return;
    
        // Filter out departments without names or peopleCount <= 0
        let filteredDeptData = deptData.filter(dept => dept.dptName && dept.peopleCount > 0);
    
        // Map department data into a format for slideshow
        let deptSlideData = filteredDeptData.map(dept => {
            // Collect members dynamically
            let members = [dept.dptHead, dept.dptProjectManager, dept.dptOperator]
                .filter(name => name && name.trim() !== ""); // Ensure no empty values
    
            return {
                image: dept.dptImg,  // Use department image
                caption: dept.dptName, // Department name as caption
                info: `People Count: ${dept.peopleCount}\nMembers: ${members.join(", ")}` // Show members
            };
        });
    
        // Display the slideshow if there is data
        if (deptSlideData.length > 0) {
            var deptSlideshow = MakeSlideShow({ picList: deptSlideData, ssTitle: "Departments" });
            firstDiv.appendChild(deptSlideshow);
        }
    });
    

    var emptySlideShow = MakeSlideShow({
        picList: [{ image: "pics_slideShow/nothing.png", caption: "No Image", info: "" }],
        ssTitle: "No Data Available"
    });

    thirdDiv.appendChild(emptySlideShow);

    return ele;
}
