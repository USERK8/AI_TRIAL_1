const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

function speak(text) {
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = "en-US";
  msg.volume = 1;
  msg.rate = 1;
  msg.pitch = 1;
  speechSynthesis.speak(msg);
}

function addMessage(message, from = "user") {
  const div = document.createElement("div");
  div.classList.add(from);
  div.textContent = (from === "user" ? "You: " : "Jarvis: ") + message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleInput() {
  const userText = input.value.trim();
  if (!userText) return;
  addMessage(userText, "user");
  input.value = "";

  let response = "I didn't understand that.";

  // Basic commands
  const command = userText.toLowerCase();
  if (command.includes("hi")) {
    response = "Hello, Sohan!";
  } else if (command.includes("time")) {
    const time = new Date().toLocaleTimeString();
    response = `The time is ${time}`;
  } else if (command.includes("date")) {
    const date = new Date().toLocaleDateString();
    response = `Today's date is ${date}`;
  } else if (command.includes("joke")) {
    const jokes = [
      "Why don’t scientists trust atoms? Because they make up everything!",
      "I told my computer I needed a break, and now it won’t stop sending me ads for Kit-Kats.",
      "Why was the math book sad? It had too many problems."
    ];
    response = jokes[Math.floor(Math.random() * jokes.length)];
  } else if (command.includes("open google")) {
    response = "Opening Google...";
    window.open("https://www.google.com", "_blank");
  } else if (command.includes("bye")) {
    response = "Goodbye, see you later!";
  }

  addMessage(response, "jarvis");
  speak(response);
}
