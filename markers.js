console.log('JS File Loaded!')

// const splash = document.querySelector('.splash');
document.addEventListener('DOMContentLoaded', (e) => {
    setTimeout(() => {
        $("#splash").addClass('display-none');
        // splash.classList.add('display-none');
    }, 10000)
});

// FOR TRACKING OF MARKERS
let viewedMarkers = [
    {
        name: 'sakunwari',
        viewed: false,
        finished: false,
    },
    {
        name: 'klimabukasan',
        viewed: false,
        finished: false,
    },
    {
        name: 'taob',
        viewed: false,
        finished: false,
    },
]

const KLIMABUKASAN_CARDS = [
    {
        name: 'TEST',
        fileName: 'CC-01',
        description: 'Lorem Ipsum',
        cardType: 'CC'
    },
    {
        name: 'TEST 2',
        fileName: 'CC-02',
        description: 'Lorem Ipsum',
        cardType: 'CC'
    }
]

let cardIdx = 0;

function updateKlimabukasanCard() {
    let klimaCard = document.getElementById('klima-card');
    const CARD_LIMIT = 44;

    cardIdx++;
    const cardNum = cardIdx % (CARD_LIMIT + 1);

    let cardString = `0${cardNum}`;
    console.log('CD STRING', cardString)
    klimaCard.setAttribute('src', `assets/cards/klima/${cardString}.png`);
}

function updateViewedMarkers(marker, action, value) {
    switch(marker) {
        case "sakunwari":
            if(action == 'viewed') {
                viewedMarkers[0].viewed = value;
            } else if(action == 'finished') {
                viewedMarkers[0].finished = value;
            }
            break;
        case "klimabukasan":
            if(action == 'viewed') {
                viewedMarkers[1].viewed = value;
            } else if(action == 'finished') {
                viewedMarkers[1].finished = value;
            }
            break;
        case "taob":
            if(action == 'viewed') {
                viewedMarkers[2].viewed = value;
            } else if(action == 'finished') {
                viewedMarkers[2].finished = value;
            }
            break;
    }
}

function handleLeftArrowClick() {
    console.log('LEFT ARROW CLICKED')
}

function handleRightArrowClick() {
    console.log('RIGHT ARROW CLICKED')
}

function checkFinishedStates(game) {
    const FEEDBACK_FORM_URL = 'https://forms.gle/SBFnXHEsDRCcJLL69'

    // CHECKED IF ALL IS FINISHED
    console.log('Checking Finished States: ', viewedMarkers)

    // if(viewedMarkers[0].finished && viewedMarkers[1].finished && viewedMarkers[2].finished) {
        Swal.fire({
            title: "Tell us what you think!",
            html: `You have finished viewing the <strong>${game}</strong> board game<br/><br/>Tell us what you think!`,
            icon: "info",
            confirmButtonText: "Keep in touch",
            allowOutsideClick: false
        }).then(function() {
            window.open(FEEDBACK_FORM_URL, '_blank');
        });
    // }
}

AFRAME.registerComponent('markerhandler', {
    init: function () {
        const scene = this.el.sceneEl;
        // const audioElements = scene.querySelectorAll('audio');
        const klimabukasanAudio = document.getElementById('klimabukasan-audio');
        const sakunwariAudio = document.getElementById('sakunwari-audio');
        const taobAudio = document.getElementById('taob-audio');

        scene.addEventListener('markerFound', (e) => {
            const markerId = e.target.id;
            console.log('MARKER FOUND!')
            console.log('MARKER ID: ', markerId)

            // console.log('AUDIO ELEMENTS: ', audioElements)

            switch (markerId) {
                case 'marker-klimabukasan':
                    // const klimabukasanAudio = document.getElementById('klimabukasan-audio');
                    updateViewedMarkers('klimabukasan', 'viewed', true);
                    // klimabukasanAudio.load();
                    // klimabukasanAudio.addEventListener('canplaythrough', () => {
                    //     console.log('AUDIO READY TO PLAY!');
                    //     klimabukasanAudio.play();
                    // });
                    klimabukasanAudio.play();

                    console.log('MARKER STATES: ', viewedMarkers);

                    break;
                case 'marker-sakunwari':
                    // const sakunwariAudio = document.getElementById('sakunwari-audio');
                    updateViewedMarkers('sakunwari', 'viewed', true);
                    // sakunwariAudio.load();
                    sakunwariAudio.play();

                    console.log('MARKER STATES: ', viewedMarkers);

                    break;
                case 'marker-taob':
                    // const taobAudio = document.getElementById('taob-audio');
                    updateViewedMarkers('taob', 'viewed', true);
                    // taobAudio.load();
                    taobAudio.play();

                    console.log('MARKER STATES: ', viewedMarkers);

                    break;
            }
        });

        scene.addEventListener('markerLost', (e) => {
            const markerId = e.target.id;
            console.log('MARKER LOST!')
            console.log('EVENT', e)
            // const sakunwariAudio = document.getElementById('sakunwari-audio');
            // const klimabukasanAudio = document.getElementById('klimabukasan-audio');
            // const taobAudio = document.getElementById('taob-audio');
            // sakunwariAudio.pause();
            // klimabukasanAudio.pause();
            // taobAudio.pause();

            switch (markerId) {
                case 'marker-klimabukasan':
                    console.log('PAUSE')
                    // const klimabukasanAudio = document.getElementById('klimabukasan-audio');
                    klimabukasanAudio.pause();

                    break;
                case 'marker-sakunwari':
                    console.log('PAUSE')
                    // const sakunwariAudio = document.getElementById('sakunwari-audio');
                    sakunwariAudio.pause();

                    break;
                case 'marker-taob':
                    console.log('PAUSE')
                    // const taobAudio = document.getElementById('taob-audio');
                    taobAudio.pause();

                    break;
            }
        });
    }
});

AFRAME.registerComponent('arrowhandler', {
    init: function (e) {
        const leftArrow = document.getElementById('left-arrow');
        const rightArrow = document.getElementById('right-arrow');
        const klimaCard = document.getElementById('klima-card');

        // console.log('ARROW HANDLER LOGGED')
        // console.log('EVENT', e)

        klimaCard.addEventListener('click', function(e) {
            console.log('inner event', e)
            console.log('Card clicked!');
            updateKlimabukasanCard();
            console.log('Updating Card...');
        });

        // rightArrow.addEventListener('click', function(e) {
        //     console.log('inner event', e)
        //     console.log('Right arrow clicked!');
        // });
    }
});

// const activeMarkers = new Set(); 

// AFRAME.registerComponent('custom-marker-handler', {
//     schema: {
//         maxMarkers: { type: 'int', default: 1 }
//     },
    
//     init: function () {
//         // this.activeMarkers = new Set(); // To track active markers
//         const scene = this.el.sceneEl;

//         scene.addEventListener('markerFound', (e) => {
//             const markerId = e.target.id;
//             console.log('MARKER FOUND!', markerId);

//             // If we already have the maximum number of markers, ignore this one
//             if (activeMarkers.size >= this.data.maxMarkers) {
//                 // Hide the newly found marker
//                 e.target.setAttribute('visible', 'false');
//                 return;
//             }

//             // Add the marker to the active set
//             activeMarkers.add(markerId);
//             this.handleMarkerFound(markerId);

//             console.log('ACTIVE MARKERS', activeMarkers)
//         });

//         scene.addEventListener('markerLost', (e) => {
//             const markerId = e.target.id;
//             console.log('MARKER LOST!', markerId);

//             // Remove the marker from the active set
//             activeMarkers.delete(markerId);
//             this.handleMarkerLost(markerId);

//             console.log('ACTIVE MARKERS', activeMarkers)
//         });
//     },

//     handleMarkerFound: function(markerId) {
//         // Show the newly found marker
//         document.getElementById(markerId).setAttribute('visible', 'true');

//         // Hide all other markers
//         const markers = document.querySelectorAll('a-marker');
//         markers.forEach((marker) => {
//             if (marker.id !== markerId) {
//                 marker.setAttribute('visible', 'false');
//             }
//         });
//     },

//     handleMarkerLost: function(markerId) {
//         // Show all other markers
//         const markers = document.querySelectorAll('a-marker');
//         markers.forEach((marker) => {
//             if (marker.id !== markerId) {
//                 marker.setAttribute('visible', 'true');
//             }
//         });
//     }
// });

// AFRAME.registerComponent('arrowhandler', {
//     init: function () {
//         console.log('ARROW HANDLER', this.el)
//         console.log('OBJECT 3D', this.el.object3D)
//         this.el.addEventListener('click', function () {
//             console.log('CLICKED');
//             if (this.id == 'left-arrow') {
//                 console.log('Left arrow clicked!');
//                 alert('LEFT');
//             } else if (this.id == 'right-arrow') {
//                 console.log('Right arrow clicked!');
//                 alert('RIGHT');
//             }
//         });
//     }
//   });

// DOCUMENT READY CODE BLOCK
$(document).ready(function() {
    $("#sakunwari-audio").on("ended", function() {
        const game = 'Sakunwari'
        updateViewedMarkers('sakunwari', 'finished', true)
        console.log("Audio Finished!");
        console.log('MARKER STATES: ', viewedMarkers);
        checkFinishedStates(game)
    });

    $("#taob-audio").on("ended", function() {
        const game = 'Táob'
        updateViewedMarkers('taob', 'finished', true)
        console.log("Audio Finished!");
        console.log('MARKER STATES: ', viewedMarkers);
        checkFinishedStates(game)
    });

    $("#klimabukasan-audio").on("ended", function() {
        const game = 'Klimabukasan'
        updateViewedMarkers('klimabukasan', 'finished', true)
        console.log("Audio Finished!");
        console.log('MARKER STATES: ', viewedMarkers);
        checkFinishedStates(game)
    });

    let typed = new Typed('#splash_typed', {
        strings: ['Governance Reform, Innovation and Transformation Laboratories', 'GRIT Labs'],
        typeSpeed: 70,
        backDelay: 400,
    });
});