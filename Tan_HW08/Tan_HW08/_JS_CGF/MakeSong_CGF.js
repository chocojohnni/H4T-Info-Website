function MakeSong_CGF() {
    var ele = document.createElement("div");
    ele.classList.add("song-container"); // Add CSS class for spacing between components

    var song1 = MakeSong({
        songTitle: "Fact Check",
        songImage: "Pictures/factCheck.jpg",
        songArtist: "NCT",
        peopleInSong: 8,
        officeMembers: 3,
        teamHMembers: 6,
        teamTMembers: 2,
        imgObjList: [
            { display: "Fact Check Cover", val: "Pictures/factCheck.jpg" },
            { display: "Smoothie Cover", val: "Pictures/smoothie.jpg" }
        ]
    });

    var song2 = MakeSong({
        songTitle: "Drama",
        songImage: "Pictures/drama.jpg",
        songArtist: "Aespa",
        peopleInSong: 8,
        officeMembers: 4,
        teamHMembers: 6,
        teamTMembers: 2,
        imgObjList: [
            { display: "Drama Cover", val: "Pictures/Drama.jpg" },
            { display: "Supernova Cover", val: "Pictures/supernova.jpg" }
        ]
    });

    var song3 = MakeSong({
        songTitle: "Bite Me",
        songImage: "Pictures/biteMe.jpg",
        songArtist: "Enhypen",
        peopleInSong: 14,
        officeMembers: 5,
        teamHMembers: 7,
        teamTMembers: 7,
        imgObjList: [
            { display: "Bite Me Cover", val: "Pictures/biteMe.jpg" }
        ]
    });

    var song4 = MakeSong({
        songTitle: "Puppet Show",
        songImage: "Pictures/puppetShow.jpg",
        songArtist: "XG",
        peopleInSong: 7,
        officeMembers: 2,
        teamHMembers: 5,
        teamTMembers: 2,
        imgObjList: [
            { display: "Puppet Show Cover", val: "Pictures/puppetShow.jpg" }
        ]
    });

    var song5 = MakeSong({});

    // Append all song components with spacing
    ele.appendChild(song1);
    ele.appendChild(song2);
    ele.appendChild(song3);
    ele.appendChild(song4);
    ele.appendChild(song5);

    return ele;
}
