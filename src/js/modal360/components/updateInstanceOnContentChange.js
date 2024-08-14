export default function updateInstanceOnContentChange() {
  window.addEventListener("slides-painted", (e) => {
    console.log(e);
  });
};
