// Conversation History
var conversation_list = [];

// Get chatbot elements
const chatbot = document.getElementById('chatbot');
const conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', function(event) {
  // Prevent form submission
  event.preventDefault();

  // Get user input
  const input = inputField.value;

  // Clear input field
  inputField.value = '';
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add user input to conversation
  let message = document.createElement('div');
  message.classList.add('chatbot-message', 'user-message');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({behavior: "smooth"});

  // Generate chatbot response
  const response = generateResponse(input);
});

// Generate chatbot response function
async function generateResponse(input) {
  conversation_list.push({"role": "user", "content": input});

  let response = await fetch('https://nlp-platform.online/whatsapp_bot/chat?token=mIngzhe666!&conversation_list=' + JSON.stringify(conversation_list));
  var data = await response.json();    
  conversation_list = data.conversation_list;

  let result = conversation_list.slice(-1)[0].content;
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

  // Add chatbot response to conversation
  message = document.createElement('div');
  message.classList.add('chatbot-message','chatbot');
  message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${result}</p>`;
  conversation.appendChild(message);
  message.scrollIntoView({behavior: "smooth"});
}
