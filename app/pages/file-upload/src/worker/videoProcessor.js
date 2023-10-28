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

  mp4Decoder(encoderConfig, stream, sendMessage) {
    const decoder = new VideoDecoder({
      output(frame) {
        debugger;
      },
      error(e) {
        console.log('Error at mp4Decoder', e);
      },
    });

    this.#mp4Demuxer.run(stream, {
      onConfig(config) {
        decoder.configure(config);
      },
      onChunk(chunk) {
        debugger;
      },
    });
  }

  async start({ file, encorderConfig }) {
    const stream = file.stream;
    const fileName = file.name.split('/').pop().replace('mp4', '');
    await this.mp4Decoder(encorderConfig, stream);
  }
}
