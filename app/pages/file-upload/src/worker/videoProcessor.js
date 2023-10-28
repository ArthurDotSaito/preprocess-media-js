export default class VideoProcessor {
  #mp4Demuxer;
  /**
   *
   * @param {object} options
   * @param {import('./mp4Demuxer').default} options.mp4Demuxer
   */

  constructor({ mp4Box }) {
    this.#mp4Demuxer = mp4Demuxer;
  }

  mp4Decoder(encoderConfig, stream, sendMessage) {}
  async start({ file, encorderConfig }) {
    const stream = file.stream;
    const fileName = file.name.split('/').pop().replace('mp4', '');
  }
}
