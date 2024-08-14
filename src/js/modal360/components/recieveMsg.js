export default function recieveMsg() {
  window.addEventListener("modal360-content", (event) => {
    console.log(event);
  });
};
