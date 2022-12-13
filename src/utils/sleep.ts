export function Sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
