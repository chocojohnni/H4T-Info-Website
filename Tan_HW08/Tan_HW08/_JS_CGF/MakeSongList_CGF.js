"use strict";

function MakeSongList_CGF () {
    var ele = document.createElement("div");

    ajax("json/h4t.json", firstCallBack, ele);

    function firstCallBack(songList) {
        songList.push({
            songTitle: "",
            image: "",
            songArtist: "",
            people: 0,
            dptName: "",
            dptProjectManager: "",
            dptHead: "",
            dptOperator: ""
        });

        var firstSongComp = MakeSongList ({
            songList: songList,
            title: "Songs",
            header: "List of Songs"
        });

        ele.appendChild(firstSongComp);
    }

    ajax("json/department.json", secondCallBack, ele);

    function secondCallBack(deptList) {
        deptList.push({
            dptName: "",
            dptProjectManager: "",
            dptHead: "",
            dptOperator: ""
        });

        var deptListComp = MakeSongList({
            songList: deptList,
            title: "Departments",
            header: "List of Departments"
        });

        ele.appendChild(deptListComp);
    }

    var defaultSongComp = MakeSongList ({
        songList: [{}],
        title: "Default Songs",
        header: "List of No Songs"
    });

    ele.appendChild(defaultSongComp);

    return ele;
}