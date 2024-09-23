export function setPanoLoader(progress, line, viewerLoader) {
  const radius = 67;
  const circumference = 2 * Math.PI * radius;
  line.style.strokeDasharray = `${circumference}`;
  const offset = circumference - (progress / 100) * circumference;
  line.style.strokeDashoffset = offset;
  if (progress === 100) {
    setTimeout(() => {
      viewerLoader.classList.add("ready");
    }, 100);
  }
}
