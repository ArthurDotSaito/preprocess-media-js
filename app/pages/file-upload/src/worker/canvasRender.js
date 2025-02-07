/**@param {HTMLCanvasElement} canvas */
let _canvas = {};
let _context = {};

export default class CanvasRender {
  /**@param {VideoFrame} frame */
  draw(frame) {
    const { displayHeight, displayWidth } = frame;

    _canvas.width = displayWidth;
    _canvas.height = displayHeight;
    _context.drawImage(frame, 0, 0, displayWidth, displayHeight);
    frame.close();
  }

  getRenderer(canvas) {
    _canvas = canvas;
    _context = _canvas.getContext('2d ');
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
