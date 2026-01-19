"use strict";

function MakeSongList({ songList = [{}], title = "Unknown Title", header = "" }) {

    function MakeSong({ 
        songTitle = "Unknown Title", songArtist = "Unknown Artist", people = 0, image = "", 
        dptName = "Unknown Department Name", dptProjectManager = "Unknown PM", 
        dptHead = "Unknown Head", dptOperator = "Unknown Operator" 
    }) {

        var songObj = document.createElement("div");
        songObj.classList.add("song");

        songObj.innerHTML = `
            <div class='songInfoC'></div>
            <button class='titleButtonC'>Change Title To:</button>
            <input class='newTitleInputC'/> <br/>
            <button class='artistButtonC'>Change Artist To:</button>
            <input class='newArtistInputC'/> <br/>
            <button class='peopleButtonC'>Change People Count:</button>
            <input class='newPeopleInputC'/> <br/>
            <button class='imageButtonC'>Change Image:</button>
            <select class='imageSelectC'>
                <option value="Pictures/drama.jpg">Image 1</option>
                <option value="Pictures/smoothie.jpg">Image 2</option>
                <option value="Pictures/factCheck.jpg">Image 3</option>
                <option value="Pictures/puppetShow.jpg">Image 4</option>
                <option value="Pictures/sticker.jpg">Image 5</option>
                <option value="Pictures/talentMngDept.jpg">Image 6</option>
                <option value="Pictures/contentMarketingDept.jpg">Image 7</option>
                <option value="Pictures/adminSupDept.jpg">Image 8</option>
                <option value="Pictures/hDept.jpg">Image 9</option>
                <option value="Pictures/tDept.jpg">Image 10</option>
            </select>
        `;

        var songInfo = songObj.querySelector(".songInfoC");
        var titleButton = songObj.querySelector(".titleButtonC");
        var newTitleInput = songObj.querySelector(".newTitleInputC");
        var artistButton = songObj.querySelector(".artistButtonC");
        var newArtistInput = songObj.querySelector(".newArtistInputC");
        var peopleButton = songObj.querySelector(".peopleButtonC");
        var newPeopleInput = songObj.querySelector(".newPeopleInputC");
        var imageButton = songObj.querySelector(".imageButtonC");
        var imageSelect = songObj.querySelector(".imageSelectC");

        var display = function () {
            let infoHtml = `
                <p>
                    Title: ${songTitle}<br/>
                    Artist: ${songArtist}<br/>
                    People Count: ${people}<br/>
                    Department: ${dptName}<br/>
                    Project Manager: ${dptProjectManager}<br/>
                    Head: ${dptHead}<br/>
                    Operator: ${dptOperator}
                </p>`;

            songInfo.innerHTML = infoHtml;

            var imageElement = songObj.querySelector("img");
            if (imageElement) {
                imageElement.src = image;  
            } else {
                var newImage = document.createElement('img');
                newImage.src = image;
                newImage.alt = songTitle;
                newImage.classList.add("songImageClass");
                songObj.appendChild(newImage);  
            }
        };

        songObj.setTitle = function (newTitle) {
            if (newTitle.trim()) {
                songTitle = newTitle;
                display();
                newTitleInput.value = "";
            }
        };
        
        songObj.setArtist = function (newArtist) {
            if (newArtist.trim()) {
                songArtist = newArtist;
                display();
                newArtistInput.value = "";
            }
        };
        
        songObj.setPeople = function (newPeople) {
            if (newPeople.trim()) {
                people = parseInt(newPeople, 10) || 0;
                display();
                newPeopleInput.value = "";
            }
        };

        songObj.changeImage = function (newImage) {
            image = newImage;
            display();
        };

        display();

        titleButton.onclick = function () {
            songObj.setTitle(newTitleInput.value);
        };
        
        artistButton.onclick = function () {
            songObj.setArtist(newArtistInput.value);
        };
        
        peopleButton.onclick = function () {
            songObj.setPeople(newPeopleInput.value);
        };
        
        imageButton.onclick = function () {
            songObj.changeImage(imageSelect.value);
        };

        return songObj;
    }

    var songListComp = document.createElement("div");
    songListComp.classList.add("songList");
    songListComp.innerHTML = `<h2>${title}</h2><h3>${header}</h3>`;

    var sortButton = document.createElement('button');
    sortButton.innerHTML = "Sort by Name";
    songListComp.appendChild(sortButton);

    sortButton.onclick = function () {
        songList.sort((a, b) => a.songTitle.localeCompare(b.songTitle));
        songListComp.innerHTML = `<h2>${title}</h2><h3>${header}</h3>`;
        songList.forEach(song => {
            songListComp.appendChild(MakeSong(song));
        });
    };

    songList.forEach(song => {
        songListComp.appendChild(MakeSong(song));
    });

    return songListComp;
}
