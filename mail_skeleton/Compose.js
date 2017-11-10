const MessageStore = require("./message_store.js");

const Compose = {

  render () {
    let div = document.createElement("DIV");
    div.className = 'new-message';
    div.innerHTML = this.renderForm();
    div.addEventListener("change", (e) => {
      let targ = e.target;
      let name = targ.name;
      let value = targ.value;
      MessageStore.updateDraftField(name, value);
    });
    div.addEventListener("submit", (e) => {
      e.preventDefault();
      MessageStore.sendDraft();
      window.location.hash = 'inbox';
    });
    return div;
  },

  renderForm() {
    let currentDraft = MessageStore.getMessageDraft();
    return `
    <p class="new-message-header">New Message</p>
    <form class="compose-form">
      <input placeholder="Recipient" name="to" type="text" value="${currentDraft.to}">
      <input placeholder="Subject" name="subject" type="text" value="${currentDraft.subject}">
      <textarea name="body" rows="20">${currentDraft.body}</textarea>
      <button type="submit" class="btn btn-primary submit-message">Send</button>
    </form>
    `;
  }
};

module.exports = Compose;
