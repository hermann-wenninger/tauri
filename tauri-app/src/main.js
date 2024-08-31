const { invoke } = window.__TAURI__.tauri;
window.__TAURI_ISOLATION_HOOK__ = (payload) => {
  // let's not verify or modify anything, just print the content from the hook
  console.log('hook', payload);
  return payload;
};

let greetInputEl;
let greetMsgEl;
let messageInputEl;
let messageMsgEl;

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}
async function message() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  messageMsgEl.textContent = await invoke("message", { number: messageInputEl.value });
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  messageInputEl = document.querySelector("#message-input");
  messageMsgEl = document.querySelector("#message-msg");
  document.querySelector("#greet-form").addEventListener("submit", (e) => {
    e.preventDefault();
    greet();
    message();
  });
});
