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

  /**@returns {ReadableStream} */
  mp4Decoder(encoderConfig, stream) {
    return new ReadableStream({
      start: async (controller) => {
        const decoder = new VideoDecoder({
          /**@param {VideoFrame} frame */
          output(frame) {
            controller.enqueue(frame);
          },
          error(e) {
            console.log('Error at mp4Decoder', e);
            controller.error(e);
          },
        });

        this.#mp4Demuxer.run(stream, {
          onConfig(config) {
            decoder.configure(config);
          },

          /**
           * @param {EncodedVideoChunk} chunk
           */
          onChunk(chunk) {
            decoder.decode(chunk);
            debugger;
          },
        });
      },
    });
  }

  async start({ file, encorderConfig }) {
    const stream = file.stream;
    const fileName = file.name.split('/').pop().replace('mp4', '');
    await this.mp4Decoder(encorderConfig, stream);
  }
}
