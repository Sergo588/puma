import { format, isBefore, isEqual, parseISO } from "date-fns";

export const isSameOrBefore = (date) => {
  const localDate = parseISO(format(new Date(), "yyyy-MM-dd'T'HH:mm:ss"));
  const currentDate = parseISO(format(date, "yyyy-MM-dd'T'HH:mm:ss"));

  return isBefore(currentDate, localDate) || isEqual(currentDate, localDate);
};
