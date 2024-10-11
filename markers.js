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

function updateKlimabukasanCard() {

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

AFRAME.registerComponent('markerhandler', {
    init: function () {
        const scene = this.el.sceneEl;
        const audioElements = scene.querySelectorAll('audio');

        scene.addEventListener('markerFound', (e) => {
            const markerId = e.target.id;
            console.log('MARKER FOUND!')
            console.log('MARKER ID: ', markerId)

            console.log('AUDIO ELEMENTS: ', audioElements)

            switch (markerId) {
                case 'marker-klimabukasan':
                    // const klimabukasanAudio = audioElements.find((audio) => audio.id === 'sakunwari-audio');
                    // klimabukasanAudio.play();
                    break;
                case 'marker-sakunwari':
                    const sakunwariAudio = document.getElementById('sakunwari-audio');
                    updateViewedMarkers('sakunwari', 'viewed', true);
                    sakunwariAudio.play();

                    console.log('MARKER STATES: ', viewedMarkers);

                    break;
            }
        });

        scene.addEventListener('markerLost', (e) => {
            console.log('MARKER LOST!')
            console.log('EVENT', e)
            const sakunwariAudio = document.getElementById('sakunwari-audio');
            sakunwariAudio.pause();
        });
    }
});

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
        updateViewedMarkers('sakunwari', 'finished', true)
        console.log("Audio Finished!");
        console.log('MARKER STATES: ', viewedMarkers);
    });

    let typed = new Typed('#splash_typed', {
        strings: ['Governance Reform, Innovation and Transformation Laboratories', 'GRIT Labs'],
        typeSpeed: 70,
        backDelay: 400,
    });
});