console.log('JS File Loaded!')

const sakunwari_marker = document.getElementById('marker-klimabukasan'); // Replace with the ID of your marker entity
const sakunwari_audio = document.getElementById('sakunwari-audio');

sakunwari_marker.addEventListener('markerFound', () => {
    mar
    sakunwari_audio.play();
});


sakunwari_marker.addEventListener('markerLost', () => {
    sakunwari_audio.pause();
});