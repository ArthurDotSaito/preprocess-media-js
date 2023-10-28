import { createFile } from '../deps/mp4box.0.5.2';

export default class Mp4Demuxer {
  #onConfig;
  #onChunk;
  #file;

  /**
   *
   * @param {ReadableStream} stream
   * @param {object} options
   * @param {(config:object) => void} options.onConfig
   *
   * @returns {Promise<void>}
   */
  async run(stream, { onConfig, onChunk }) {
    this.#onConfig = onConfig;
    this.#onChunk = onChunk;

    this.#file = createFile();
    this.#file.onReady = (args) => {
      debugger;
    };
    this.#file.onError = (error) => {
      console.log('Error MP4 Demuxer', error);
    };

    this.#init(stream);
  }
  #init(stream) {}
}
