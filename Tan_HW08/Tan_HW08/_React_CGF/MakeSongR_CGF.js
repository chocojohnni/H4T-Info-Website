"use strict";

function MakeSongR_CGF() {
    return (
        <div>
            {songs.map((song) => (
                <MakeSongR
                    key={song.songTitle}
                    songTitle={song.songTitle}
                    songImage={song.songImage}
                    songArtist={song.songArtist}
                    peopleInSong={song.peopleInSong}
                    officeMembers={song.officeMembers}
                    teamHMembers={song.teamHMembers}
                    teamTMembers={song.teamTMembers}
                    imgObjList={song.imgObjList}
                />
            ))}
        </div>
    )
}

const emptySong = {
    songTitle: "Unknown Title",
    songImage: "Image Unavailable",
    songArtist: "Unknown Artist",
    peopleInSong: 0,
    officeMembers: 0,
    teamHMembers: 0,
    teamTMembers: 0,
    imgObjList: []
};


const songs = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },

    emptySong
];

ReactDOM.render(<SongList songs={songs} />, document.getElementById("root"));
