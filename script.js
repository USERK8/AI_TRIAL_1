const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const OPENAI_API_KEY = "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"; // 👈 Replace with yours

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

async function handleInput() {
  const userText = input.value.trim();
  if (!userText) return;
  addMessage(userText, "user");
  input.value = "";

  const loading = document.createElement("div");
  loading.textContent = "Jarvis is thinking...";
  chatBox.appendChild(loading);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content.trim();

    chatBox.removeChild(loading);
    addMessage(reply, "jarvis");
    speak(reply);
  } catch (error) {
    chatBox.removeChild(loading);
    const errMsg = "Sorry, I ran into a problem.";
    addMessage(errMsg, "jarvis");
    speak(errMsg);
    console.error(error);
  }
}
