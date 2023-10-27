export default class VideoProcessor {
  #mp4Box;
  /**
   *
   * @param {object} options
   * @param {import('./mp4Demuxer').default} options.mp4Box
   */

  constructor({ mp4Box }) {
    this.#mp4Box = mp4Box;
  }

  mp4Decoder(encoderConfig, stream) {}
  async start({ file, encorderConfig }) {
    const stream = file.stream;
    const fileName = file.name.split('/').pop().replace('mp4', '');
  }
}
