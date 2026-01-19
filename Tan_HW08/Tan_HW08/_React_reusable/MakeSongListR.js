"use strict";

const { useState, useEffect } = React;

function MakeSongListR({ songList = [{}], title = "Unknown Song List Title", dsc = "Unknown Description" }) {

    function MakeSong({
        songTitle = "Unknown Title", songArtist = "Unknown Artist", people = 0, image = "",
        dptName = "Unknown Department Name", dptProjectManager = "Unknown PM",
        dptHead = "Unknown Head", dptOperator = "Unknown Operator"
    }) {

        const [songTitleState, setSongTitleState] = useState(songTitle);
        const [artist, setArtist] = useState(songArtist);
        const [peopleCount, setPeopleCount] = useState(people);
        const [songImage, setSongImage] = useState(image || "Pictures/default.jpg");

        return (
            <div className="songR">
                <p>
                    Click "Change Title" to modify the song title.<br />
                    Click "Change Artist" to modify the artist name.<br />
                    Click "Change People Count" to update the number of people.<br />
                    Use the dropdown menu to change the song image.
                </p>
                <div className="songRInfo">
                    <p>
                        <strong>Title:</strong> {songTitleState} <br />
                        <strong>Artist:</strong> {artist} <br />
                        <strong>People Count:</strong> {peopleCount} <br />
                        <strong>Department:</strong> {dptName} <br />
                        <strong>Project Manager:</strong> {dptProjectManager} <br />
                        <strong>Head:</strong> {dptHead} <br />
                        <strong>Operator:</strong> {dptOperator}
                    </p>
                </div>
                <button onClick={() => setSongTitleState(prompt("Enter new title:", songTitleState) || songTitleState)}>Change Title</button>
                <button onClick={() => setArtist(prompt("Enter new artist:", artist) || artist)}>Change Artist</button>
                <button onClick={() => setPeopleCount(parseInt(prompt("Enter new people count:", peopleCount), 10) || peopleCount)}>Change People Count</button>
                <select onChange={(e) => setSongImage(e.target.value)}>
                    {["drama", "smoothie", "factCheck", "puppetShow", "sticker", "talentMngDept", "contentMarkDept", "adminSupDept", "hDept", "tDept"].map((img, index) => (
                        <option key={index} value={`Pictures/${img}.jpg`}>Image {index + 1}</option>
                    ))}
                </select>
                <img src={songImage} alt={title} className="songRImage" />
            </div>
        );
    }

    const [songs, setSongs] = useState(songList);

    const sortSongs = () => {
        setSongs([...songs].sort((a, b) => a.songTitle.localeCompare(b.songTitle)));
    };

    const sortByPeopleCount = () => {
        setSongs([...songs].sort((a, b) => a.people - b.people));
    }

    return (
        <div className="songListR">
            <h2>{title}</h2>
            <h3>{dsc}</h3>
            <button onClick={sortSongs}>Sort by Name</button>
            <button onClick={sortByPeopleCount}>Sort by Number of People</button>
            {songs.map((song, index) => (
                <MakeSong key={index} {...song} />
            ))}
        </div>
    );
}