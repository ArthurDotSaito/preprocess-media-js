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

    this.#file.onSamples = (args) => {
      debugger;
    };

    this.#file.onError = (error) => {
      console.log('Error MP4 Demuxer', error);
    };

    return this.#init(stream);
  }

  /**
   *
   * @param {ReadableStream} stream
   * @returns Promise<void>
   *
   */

  #init(stream) {
    let _offSet = 0;
    const consumeFile = new WritableStream({
      /**@param {Uint8Array} chunk */
      write: (chunk) => {
        const copy = chunk.buffer;
        copy.fileStart = _offSet;
        this.#file.appendBuffer(copy);

        _offSet += chunk.length;
      },
      close: () => {
        this.#file.flush();
      },
    });

    return stream.pipeTo(consumeFile);
  }
}
