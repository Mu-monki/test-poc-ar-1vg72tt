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

function checkFinishedStates(game) {
    const FEEDBACK_FORM_URL = 'https://forms.gle/SBFnXHEsDRCcJLL69'

    // CHECKED IF ALL IS FINISHED
    console.log('Checking Finished States: ', viewedMarkers)

    // if(viewedMarkers[0].finished && viewedMarkers[1].finished && viewedMarkers[2].finished) {
        Swal.fire({
            title: "Tell us what you think!",
            html: `You have finished viewing the <strong>${game}</strong> board game<br/> Tell us what you think!`,
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

        scene.addEventListener('markerFound', (e) => {
            const markerId = e.target.id;
            console.log('MARKER FOUND!')
            console.log('MARKER ID: ', markerId)

            // console.log('AUDIO ELEMENTS: ', audioElements)

            switch (markerId) {
                case 'marker-klimabukasan':
                    const klimabukasanAudio = document.getElementById('klimabukasan-audio');
                    updateViewedMarkers('klimabukasan', 'viewed', true);
                    klimabukasanAudio.load();
                    klimabukasanAudio.addEventListener('canplaythrough', () => {
                        console.log('AUDIO READY TO PLAY!');
                        klimabukasanAudio.play();
                    });

                    console.log('MARKER STATES: ', viewedMarkers);

                    break;
                case 'marker-sakunwari':
                    const sakunwariAudio = document.getElementById('sakunwari-audio');
                    updateViewedMarkers('sakunwari', 'viewed', true);
                    sakunwariAudio.load();
                    sakunwariAudio.play();

                    console.log('MARKER STATES: ', viewedMarkers);

                    break;
                case 'marker-taob':
                    const taobAudio = document.getElementById('taob-audio');
                    updateViewedMarkers('taob', 'viewed', true);
                    taobAudio.load();
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
                    const klimabukasanAudio = document.getElementById('klimabukasan-audio');
                    klimabukasanAudio.pause();

                    break;
                case 'marker-sakunwari':
                    console.log('PAUSE')
                    const sakunwariAudio = document.getElementById('sakunwari-audio');
                    sakunwariAudio.pause();

                    break;
                case 'marker-taob':
                    console.log('PAUSE')
                    const taobAudio = document.getElementById('taob-audio');
                    taobAudio.pause();

                    break;
            }
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