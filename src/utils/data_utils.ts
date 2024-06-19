export const countdown = (currentDate: Date, expireDate: Date) => {
  const totalSeconds = Math.floor(
    (expireDate.getTime() - currentDate.getTime()) / 1000
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours} hr ${minutes} min ${seconds} sec`;
};
