const MessageStore = require("./message_store.js");

const Sent = {

  renderMessage(message) {
    let li = document.createElement('LI');
    li.className = 'message';
    li.innerHTML = `<span class="from">To: ${message.to}</span>
    <span class="subject">${message.subject}</span>
    <span class="body">${message.body}</span>`;
    return li;
  },

  render () {
    let ul = document.createElement('UL');
    ul.className = 'messages';
    let messages = MessageStore.getSentMessages();
    messages.forEach((message) => {
      ul.appendChild(this.renderMessage(message));
    });
    return ul;
  }
};

module.exports = Sent;
