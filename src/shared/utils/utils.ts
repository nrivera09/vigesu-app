import { v4 as uuidv4 } from "uuid";

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

export const sanitizeElementForPDF = (element: HTMLElement) => {
  const clone = element.cloneNode(true) as HTMLElement;

  const walk = (el: HTMLElement) => {
    const computedStyle = window.getComputedStyle(el);

    const color = computedStyle.color;
    const bg = computedStyle.backgroundColor;

    // Forzar color seguro si es oklch, hsl, var(), etc.
    if (
      color.includes("oklch") ||
      color.includes("var") ||
      color.includes("hsl")
    ) {
      el.style.color = "#000";
    }

    if (bg.includes("oklch") || bg.includes("var") || bg.includes("hsl")) {
      el.style.backgroundColor = "#fff";
    }

    // Recursivamente aplicar a hijos
    Array.from(el.children).forEach((child) => {
      if (child instanceof HTMLElement) walk(child);
    });
  };

  walk(clone);
  return clone;
};

export const formatDate = (input: string): string => {
  const date = new Date(input);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getMonth() + 1)}/${pad(
    date.getDate()
  )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(
    date.getMinutes()
  )}:${pad(date.getSeconds())}`;
};

export function renameFileWithUniqueName(file: File): File {
  const extension = file.name.split(".").pop();
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
  const uniqueId = uuidv4();
  const newName = `${timestamp}-${uniqueId}.${extension}`;

  return new File([file], newName, { type: file.type });
}
