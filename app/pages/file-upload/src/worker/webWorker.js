onmessage = ({ data }) => {
  console.log('received', data);
  self.postMessage('worker here!');
};
