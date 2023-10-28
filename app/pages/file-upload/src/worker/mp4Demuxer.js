import { DataStream, createFile } from '../deps/mp4box.0.5.2';

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

    this.#file.onReady = this.#onReady.bind(this);

    this.#file.onSamples = this.#onSamples.bind(this);

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

  #onReady(info) {
    const track = info.videoTracks;
    this.#onConfig({
      codec: track.codec,
      codedHeight: track.video.height,
      codedWidth: track.video.width,
      description: this.#description(track),
    });
    this.#file.setExtractionOptions(track.id);
    this.#file.start();
  }

  #onSamples(trackId, ref, samples) {
    debugger;
  }

  #description(track) {
    const track = this.#file.getTrackById(track.id);
    for (const entry of track.mdia.minf.stbl.stsd.entries) {
      const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
      if (box) {
        const stream = new DataStream(undefined, 0, DataStream.BIG_ENDIAN);
        box.write(stream);
        return new Uint8Array(stream.buffer, 8);
      }

      throw new Error('avcC, hvcC, vpcC, av1C not found');
    }
  }
}
