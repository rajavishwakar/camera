
const startButton = document.getElementById('startButton');
const video = document.getElementById('video');

let stream;

startButton.addEventListener('click', async() => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        startButton.textContent = 'Close Camera';
        startButton.removeEventListener('click', startCamera);
        startButton.addEventListener('click', closeCamera);
    } catch (err) {
        console.error('Error accessing the camera: ', err);
    }
});

function closeCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        startButton.textContent = 'Open Camera';
        startButton.removeEventListener('click', closeCamera);
        startButton.addEventListener('click', startCamera);
    }
}