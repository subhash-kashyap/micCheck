// const screenAudioConstraints = {
//     audio: {
//       mandatory: {
//         chromeMediaSource: 'desktop'
//       }
//     }
// }

// const micStream = navigator.mediaDevices.getUserMedia(
//     screenAudioConstraints
// )

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
.then(function(stream) {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  microphone = audioContext.createMediaStreamSource(stream);
  javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

  analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 1024;

  microphone.connect(analyser);
  analyser.connect(javascriptNode);
  javascriptNode.connect(audioContext.destination);
  javascriptNode.onaudioprocess = function() {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var values = 0;

      var length = array.length;
      for (var i = 0; i < length; i++) {
        values += (array[i]);
      }

      var average = values / length;

    console.log(Math.round(average));
    // colorPids(average);
  }
  })
  .catch(function(err) {
    /* handle the error */
});