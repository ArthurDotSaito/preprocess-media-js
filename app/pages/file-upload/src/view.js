export default class View {
  #fileUpload = document.getElementById('fileUpload');
  #btnUploadVideo = document.getElementById('btnUploadVideos');
  #fileSize = document.getElementById('fileSize');
  #fileInfo = document.getElementById('fileInfo');
  #txtfileName = document.getElementById('fileName');
  #fileUploadWrapper = document.getElementById('fileUploadWrapper');
  #elapsed = document.getElementById('elapsed');
  #canvas = document.getElementById('preview-144p');

  configureOnFileChange(fn) {
    this.#fileUpload.addEventListener('change', this.onChange(fn));
  }

  onChange(e) {
    const file = e.target.files[0];
    const { name, size } = file;
    txtfileName.innerText = name;
    fileSize.innerText = parseBytesIntoMBAndGB(size);

    fileInfo.classList.remove('hide');
    fileUploadWrapper.classList.add('hide');

    clock.start((time) => {
      took = time;
      elapsed.innerText = `Process started ${time}`;
    });

    setTimeout(() => {
      clock.stop();
      elapsed.innerText = `Process took ${took.replace('ago', '')}`;
    }, 5000);
  }
}
