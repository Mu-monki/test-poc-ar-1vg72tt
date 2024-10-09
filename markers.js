console.log('JS File Loaded!')

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
                    sakunwariAudio.play();
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