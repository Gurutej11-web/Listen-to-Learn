// Audio Recorder functionality

let mediaRecorder;
let recordedChunks = [];
let recordingStartTime;
let recordingInterval;

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      window.recordedBlob = new Blob(recordedChunks, { type: 'audio/webm' });
      stream.getTracks().forEach(track => track.stop());
    };
    
    mediaRecorder.start();
    recordingStartTime = Date.now();
    
    // Update UI
    document.getElementById('recordBtn').style.display = 'none';
    document.getElementById('stopRecordBtn').style.display = 'inline-block';
    document.getElementById('recordingTime').style.display = 'block';
    
    // Update timer
    recordingInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
      window.recordingDuration = elapsed;
      document.getElementById('recordingDuration').textContent = formatDuration(elapsed);
    }, 100);
    
    showSuccess('Recording started');
  } catch (error) {
    console.error('Error accessing microphone:', error);
    showError('Unable to access microphone. Check permissions.');
  }
}

function stopRecording() {
  if (mediaRecorder) {
    mediaRecorder.stop();
    clearInterval(recordingInterval);
    
    // Update UI
    document.getElementById('recordBtn').style.display = 'inline-block';
    document.getElementById('stopRecordBtn').style.display = 'none';
    document.getElementById('recordingTime').style.display = 'none';
    
    showSuccess('Recording stopped. Ready to save!');
  }
}
