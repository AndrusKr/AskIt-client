import {Client} from "@stomp/stompjs"

class SocketClient {

  constructor() {
    this.stompClient = new Client()
  }

  get isConnected() {
    return !!this.stompClient.connected
  }

  async connect() {
    this.stompClient.configure({
      brokerURL: 'ws://localhost:8080/stomp',
      onConnect: (frame) => {
        // this.stompClient.subscribe(`/topic/questions`, msg => console.log(msg.body))
        // this.stompClient.publish({
        //   destination: `/app/process-question`,
        //   body: JSON.stringify({name: "Andrus", message: "Hi!"})
        // });
        console.log(`CONNECTED to ${this.stompClient.brokerURL} !`, frame)
      },
      onDisconnect: frame => console.log(`DISCONNECTED from ${this.stompClient.brokerURL} !`, frame)
      // Helps during debugging, remove in production
      // debug: (str) => {
      //   console.log(new Date(), str);
      // }
    });
    await this.stompClient.activate()
  }

  async subscribeTopic(topic, onReceive) {
    let a = performance.now()
    const untilConnected = async () => {
      while (!this.isConnected) {
        if (this.isConnected) return
        await new Promise(r => setTimeout(r, 0));
      }
    }
    await untilConnected()
    let b = performance.now()
    let c = b - a
    console.log(`Took: ${c} ms. to CONNECT.`)
    this.stompClient.subscribe(`/topic/${topic}`, onReceive)
    console.log(`SUBSCRIBED to ${this.stompClient.brokerURL}/topic/${topic}`)
  }

  sendMsg(endpoint, msg) {
    this.stompClient.publish({destination: `/app/${endpoint}`, body: JSON.stringify(msg)})
    console.log("SEND msg", msg)
  }
}

export default new SocketClient()