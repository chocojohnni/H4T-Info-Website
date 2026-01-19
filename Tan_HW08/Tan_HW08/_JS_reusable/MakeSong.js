function MakeSong({
    songTitle = "Unknown Title",
    songImage = "",
    songArtist = "Unknown Artist",
    peopleInSong = 0,
    officeMembers = 0,
    teamHMembers = 0,
    teamTMembers = 0,
    imgObjList = []
} = {}) {

    var ele = document.createElement("div");
    ele.classList.add("song");

    // Create elements
    var titleEle = document.createElement("h1");
    var titleInput = document.createElement("input");
    var imgEle = document.createElement("img");
    var selectEle = document.createElement("select");
    var detailsEle = document.createElement("div");
    var peopleLabel = document.createElement("p");
    var incrementBtn = document.createElement("button");

    titleInput.type = "text";
    titleInput.classList.add("title-input");

    imgEle.classList.add("song-image");
    selectEle.classList.add("selectImagesC");
    detailsEle.classList.add("song-details");


    // ** Private display function (re-renders UI when properties change) **
    function display() {
        titleEle.innerText = `${songTitle} - ${songArtist}`;
        titleInput.value = songTitle;
        imgEle.src = songImage;
        imgEle.alt = `Cover Image For ${songTitle}`;
        peopleLabel.innerHTML = `<strong>Total People In Song:</strong> <span class="people-count">${peopleInSong}</span>`;

        // Populate <select> tag
        selectEle.innerHTML = "";
        imgObjList.forEach(imgObj => {
            var option = document.createElement("option");
            option.value = imgObj.val;
            option.textContent = imgObj.display;
            if (imgObj.val === songImage) {
                option.selected = true;
            }
            selectEle.appendChild(option);
        });

        detailsEle.innerHTML = `
            <p><strong>Office Members In Song:</strong> ${officeMembers}</p>
            <p><strong>Team H Members In Song:</strong> ${teamHMembers}</p>
            <p><strong>Team T Members In Song:</strong> ${teamTMembers}</p>
        `;
    }

    // ** Event Listeners (Trigger UI updates) **
    titleInput.addEventListener("input", function () {
        songTitle = this.value;
        display();
    });

    selectEle.addEventListener("change", function () {
        songImage = this.value;
        display();
    });

    // Append elements
    ele.appendChild(titleEle);
    ele.appendChild(titleInput);
    ele.appendChild(imgEle);
    ele.appendChild(selectEle);
    ele.appendChild(peopleLabel);
    ele.appendChild(detailsEle);

    // ** Initial UI Render **
    display();

    return ele;
}
