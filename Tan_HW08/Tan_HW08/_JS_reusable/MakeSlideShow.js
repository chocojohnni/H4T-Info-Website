"use strict";

function MakeSlideShow({
    picList = [{ image: "pics_slideShow/nothing.png", caption: "No Image", info: "" }],
    ssTitle = "Untitled"
}) {
    // Ensure all items have the expected structure
    picList = picList.map(item => 
        typeof item === "string" ? { image: item, caption: "Untitled", info: "" } : item
    );

    var slideShow = document.createElement("div");
    slideShow.classList.add("slideShow");

    slideShow.innerHTML = `
        <h2>${ssTitle}</h2>
        <img class="myImageC" src="${picList[0].image}" alt="${picList[0].caption}" />
        <p class="myCaptionC">${picList[0].caption}</p>
        <p class="myInfoC" style="display: none;">${picList[0].info}</p>
        <button class="infoToggleC">Show Info</button>
        <div>
            <button class="backButtonC">&lt;</button> &nbsp;
            <button class="fwdButtonC">&gt;</button>
        </div>
    `;

    // Get elements
    var img = slideShow.querySelector(".myImageC");
    var caption = slideShow.querySelector(".myCaptionC");
    var info = slideShow.querySelector(".myInfoC");
    var infoToggle = slideShow.querySelector(".infoToggleC");
    var backBtn = slideShow.querySelector(".backButtonC");
    var fwdBtn = slideShow.querySelector(".fwdButtonC");

    // Slideshow state
    var currentIndex = 0;

    function updateSlide() {
        img.src = picList[currentIndex].image;
        img.alt = picList[currentIndex].caption;
        caption.textContent = picList[currentIndex].caption;
        info.textContent = picList[currentIndex].info;
    }

    // Button Event Listeners
    fwdBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % picList.length; // Loop back to start
        updateSlide();
    });

    backBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + picList.length) % picList.length; // Loop to end
        updateSlide();
    });

    infoToggle.addEventListener("click", () => {
        if (info.style.display === "none") {
            info.style.display = "block";
            infoToggle.textContent = "Hide Info";
        } else {
            info.style.display = "none";
            infoToggle.textContent = "Show Info";
        }
    });

    // Return slideshow element
    return slideShow;
}
