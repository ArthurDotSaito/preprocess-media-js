export default class CanvasRender {
  #canvas;
  #ctx;
  /**@param {HTMLCanvasElement} canvas */
  constructor(canvas) {
    this.#canvas = canvas;
    this.#ctx = canvas.getContext('2d');
  }

  /**@param {VideoFrame} frame */
  draw(frame) {}

  getRenderer() {
    const renderer = this;
    let pendingFrame = null;
    return (frame) => {
      const renderAnimationFrame = () => {
        renderer.draw(pendingFrame);
        pendingFrame = null;
      };

      if (!pendingFrame) {
        requestAnimationFrame(renderAnimationFrame);
      } else {
        pendingFrame.close();
      }

      pendingFrame = frame;
    };
  }
}
