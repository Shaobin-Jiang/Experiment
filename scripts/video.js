const videoContent = ["陶瓷", "啤酒", "火锅", "行李箱"];
const videoTitle = ["十二生肖", "爱情公寓", "舌尖上的中国", "向往的生活"];
const popupWindowTiming = [35, 49, 17, 38];

let screenWidth = document.documentElement.clientWidth,
    screenHeight = document.documentElement.clientHeight,
    video = document.querySelector("video"),
    videoWidth = getComputedStyle(video).width.replace("px", ""),
    videoHeight = getComputedStyle(video).height.replace("px", "");

let videoHasStarted = false;
let videoIsPlaying = false;

let source = window.location.search.match(/videoID=(\d)+/g)[0].replace("videoID=", "");
// let imageSource = window.location.search.match(/imageID=(\d)+/g)[0].replace("imageID=", "");
let popupDuration = window.location.search.match(/popup=(\d)+/g)[0].replace("popup=", "");
let videoOrder = window.location.search.match(/videoOrder=(\d)+/g)[0].replace("videoOrder=", "").split('');
let imageOrder = window.location.search.match(/imageOrder=(\d)+/g)[0].replace("imageOrder=", "").split('');
let imageSource = imageOrder[videoOrder.indexOf(source)];

let optionList = document.querySelectorAll("#list .option");
for (let i = 0; i < 4; i++) {
    let elem = optionList[i];
    elem.innerHTML = `<a target="_self" href="${window.location.href.replace(/videoID=(\d)+/g, "videoID=" + videoOrder[i])}">${videoTitle[videoOrder[i]]}</a>`;
    if (videoOrder[i] == source) {
        elem.classList.add("highlight");
    }
}

let t0, timer;
let playedTime = 0;

new Promise(function (resolve) {
    setTimeout(function () {
        video.src = `./videos/${videoContent[source]}.mp4`;
        document.querySelector("#popup").innerHTML = `<img src="./images/${videoContent[imageSource]}.jpg" width="100%">`;
        // video.src = `https://gcore.jsdelivr.net/gh/Shaobin-Jiang/experiment/videos/${videoContent[source]}.mp4`;
        // document.querySelector("#popup").innerHTML = `<img src="https://gcore.jsdelivr.net/gh/Shaobin-Jiang/experiment/images/${videoContent[imageSource]}.jpg" width="100%">`;
        resolve("Done");
    });
}).then(function () {
    adjustVideoSize();
    video.style.visibility = "visible";
    // video.addEventListener("click", function (event) {
    //     if (!videoHasStarted) {
    //         video.play();
    //     }
    // })
    video.addEventListener("play", function (event) {
        t0 = performance.now();
        videoIsPlaying = true;
        if (!videoHasStarted) {
            t0 = performance.now();
            videoHasStarted = true;
            timer = setInterval(function () {
                let t1 = performance.now();
                if (videoIsPlaying) {
                    playedTime += (t1 - t0) / 1000;
                }
                t0 = t1;
                if (playedTime >= popupWindowTiming[source]) {
                    clearInterval(timer);
                    document.querySelector("#popup").classList.add("show");
                    setTimeout(function () {
                        document.querySelector("#popup").style.visibility = "hidden";
                    }, popupDuration * 1000)
                }
            }, 16);
        }
    });
    video.addEventListener("pause", function () {
        if (videoHasStarted) {
            videoIsPlaying = false;
        }
    });
});

function adjustVideoSize() {
    video.removeAttribute("height");
    video.removeAttribute("width");
    screenWidth = document.documentElement.clientWidth;
    screenHeight = document.documentElement.clientHeight;

    if ((screenWidth / screenHeight) > (videoWidth / videoHeight)) {
        video.setAttribute("height", "100%");
    }
    else {
        video.setAttribute("width", "100%");
    }
}

window.onresize = function () {
    adjustVideoSize();
}

document.querySelector("#toggle").addEventListener("click", function () {
    this.innerText = (this.innerText == "<") ? ">" : "<";
    document.querySelector("#list").classList.toggle("folded");
});

video.addEventListener("canplay", function () {
    videoWidth = this.videoWidth;
    videoHeight = this.videoHeight;
    adjustVideoSize();
});
