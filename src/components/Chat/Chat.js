import React, { Component } from 'react';
import Message from '../Message/index';
import './Chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      messageInput: ''
    };
  }

  changeInputMessage = event => {
      this.setState({ messageInput: event.target.value });
  };

  sendMessageOnEnter = event => {
    const { messageInput, messages } = this.state;
    if (event.key === 'Enter') {
      this.setState({
        messageInput: '',
        messages: [...messages, { text: messageInput }]
      });
    }
  };

  render() {
    const { messages, messageInput } = this.state;
    return (
      <div className="chat">
        <div className="message-list">
          <div className="messages">
            {messages.map((el, i) => {
            return  <Message text={el.text} key={i} />
            })}
          </div>
        </div>
        <input
          className="input-message"
          value={messageInput}
          onKeyPress={this.sendMessageOnEnter}
          onChange={this.changeInputMessage}
        />
      </div>
    );
  }
}

export default Chat;
