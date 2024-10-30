export function getTimeDisplay(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const secondsElapsed = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (secondsElapsed < 60) return "방금 전";
  const minutesElapsed = Math.floor(secondsElapsed / 60);
  if (minutesElapsed < 60) return `${minutesElapsed}분 전`;
  const hoursElapsed = Math.floor(minutesElapsed / 60);
  if (hoursElapsed < 24) return `${hoursElapsed}시간 전`;
  const daysElapsed = Math.floor(hoursElapsed / 24);
  if (daysElapsed < 7) return `${daysElapsed}일 전`;

  return time.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
