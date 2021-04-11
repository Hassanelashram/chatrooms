import consumer from "./consumer";

const htmlToElem = (html) => {
  const temp = document.createElement('template');
  html = html.trim();
  temp.innerHTML = html;
  return temp.content.firstChild;
}

const scrollToBottom = (element) => {
  element.scrollTop = element.scrollHeight;
}

const initChatroomCable = () => {
  const messagesContainer = document.getElementById('messages');
  scrollToBottom(messagesContainer);
  if (messagesContainer) {
    const id = messagesContainer.dataset.chatroomId;
    
    consumer.subscriptions.create({ channel: "ChatroomChannel", id: id }, {
      received(data) {
        scrollToBottom(messagesContainer);
        const message = htmlToElem(data);
        const senderId = message.dataset.senderId;
        const currentUserId = messagesContainer.dataset.currentUser;

        if (currentUserId === senderId) {
          message.classList.add('text-right', 'from-self')
        } else {
          message.classList.remove('text-right', 'from-self')
        }

        messagesContainer.appendChild(message) // called when data is broadcast in the cable
        scrollToBottom(messagesContainer);
      },
    });
  }
}

export { initChatroomCable };