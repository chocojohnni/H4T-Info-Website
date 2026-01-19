"use strict";

const MakeSongR = ({
    songTitle: initialTitle = "Unknown Title",
    songImage: initialImage = "",
    songArtist = "Unknown Artist",
    peopleInSong = 0,
    officeMembers = 0,
    teamHMembers = 0,
    teamTMembers = 0,
    imgObjList = []
}) => {
    // State variables
    const [songTitle, setSongTitle] = React.useState(initialTitle);
    const [songImage, setSongImage] = React.useState(initialImage);

    return (
        <div className="songR">
            <h1 className="songR-title">{songTitle} - {songArtist}</h1>
            <input
                type="text"
                className="title-input"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
            />
            <img
                className="songR-image"
                src={songImage}
                alt={`Cover Image For ${songTitle}`}
            />
            <select
                className="selectImagesC"
                value={songImage}
                onChange={(e) => setSongImage(e.target.value)}
            >
                {imgObjList.map((imgObj) => (
                    <option key={imgObj.val} value={imgObj.val}>
                        {imgObj.display}
                    </option>
                ))}
            </select>
            <p>
                <strong>Total People In Song:</strong>{" "}
                <span className="people-count">{peopleInSong}</span>
            </p>
            <div className="songR-details">
                <p><strong>Office Members In Song:</strong> {officeMembers}</p>
                <p><strong>Team H Members In Song:</strong> {teamHMembers}</p>
                <p><strong>Team T Members In Song:</strong> {teamTMembers}</p>
            </div>
        </div>
    );
};

// Container to hold multiple songs horizontally
const SongList = ({ songs }) => {
    return (
        <div className="songR-container">
            {songs.map((song, index) => (
                <MakeSongR key={index} {...song} />
            ))}
        </div>
    );
};
