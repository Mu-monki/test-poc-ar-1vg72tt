console.log('JS File Loaded!')

const sakunwari_marker = document.getElementById('marker-klimabukasan'); // Replace with the ID of your marker entity
const sakunwari_audio = document.getElementById('sakunwari-audio');

marker.addEventListener('markerFound', () => {
    sakunwari_audio.play();
});


marker.addEventListener('markerLost', () => {
    sakunwari_audio.pause();
});