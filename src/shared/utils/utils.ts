export const toISOStringWithTime = (date: string, time: string): string => {
  if (!date) return "";
  const isoDate = date + "T" + (time || "00:00") + ":00.000Z";
  return isoDate;
};

export const toISOStringDateOnly = (date: string): string => {
  if (!date) return "";
  return date + "T00:00:00.000Z";
};

export const toISOStringWithTimeSmart = (
  date: string,
  timeStart?: string,
  timeFinish?: string
): { start: string; finish: string } => {
  const baseDate = new Date(date + "T00:00:00.000Z");

  const safeTimeStart = timeStart?.trim() || "00:00";
  const safeTimeFinish = timeFinish?.trim() || "00:00";

  const [startHours, startMinutes] = safeTimeStart.split(":").map(Number);
  const [finishHours, finishMinutes] = safeTimeFinish.split(":").map(Number);

  const startDate = new Date(baseDate);
  startDate.setUTCHours(startHours, startMinutes, 0, 0);

  const finishDate = new Date(baseDate);
  finishDate.setUTCHours(finishHours, finishMinutes, 0, 0);

  if (finishDate <= startDate) {
    finishDate.setUTCDate(finishDate.getUTCDate() + 1);
  }

  return {
    start: startDate.toISOString(),
    finish: finishDate.toISOString(),
  };
};
