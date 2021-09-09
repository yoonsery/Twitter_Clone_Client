import socket from 'socket.io-client';

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on('connect_error', (error) => {
      console.log('socket error', error.message);
    });
  }

  onSync(event, callback) {
    // 무엇을 듣고 싶은지 event (주제를) 전달하고, 그 이벤트를 통해 뭘 하고싶은지 callback을 전달한다
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event); // 더이상 듣고 싶지 않을 때 끌 수 있도록 리턴해준다
  }
}
