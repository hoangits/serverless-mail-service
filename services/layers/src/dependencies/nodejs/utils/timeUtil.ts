import { TimeFormat } from "common/enums/timeFormatEnums";

interface TimeSpanResponse {
  days: number;
  hours: number;
  mins: number;
  seconds: number;
}

export default class TimeUtils {
  public static MILLIS_PER_SECOND = 1000;
  public static MILLIS_PER_MINUTE = 60000;   //     60,000
  public static MILLIS_PER_HOUR = 3600000;   //  3,600,000
  public static MILLIS_PER_DAY = 86400000;   // 86,400,000

  public static timeSpanFormat(startDate: Date, endDate: Date, format: string): string {
    const { days, hours, mins, seconds } = this.timeSpan(startDate, endDate);

    let timeSpanRes = "";
    const newHours = (hours < 10 ? `0${hours}` : hours);
    const newDays = (days < 10 ? `0${days}` : days);
    const newMinutes = (mins < 10 ? `0${mins}` : mins);
    const newSeconds = (seconds < 10 ? `0${seconds}` : seconds);

    switch (format) {
      case TimeFormat.MM_SS:
        const minsTime = (days * 24 * 60 + hours * 60 + mins);
        timeSpanRes = `${newSeconds}s`;
        if (minsTime > 0) {
          timeSpanRes = [
            minsTime < 10 ? `0${minsTime}m` : `${minsTime}m`,
            `${newSeconds}s`,
          ].join(" ");
        }
        break;
      case TimeFormat.HH_MM_SS:
        const hoursTime = days * 24 + hours;
        timeSpanRes = [`${newMinutes}m`, `${newSeconds}s`].join(" ");
        if (hoursTime > 0) {
          timeSpanRes = [
            hoursTime < 10 ? `0${hoursTime}h` : `${hoursTime}h`,
            `${newMinutes}m`,
            `${newSeconds}s`,
          ].join(" ");
        }
        break;
      case TimeFormat.DD_HH_MM_SS:
        timeSpanRes = `${newDays}d ${newHours}h ${newMinutes}m ${newSeconds}s`;
        break;
      default:
        timeSpanRes = `${newDays}d ${newHours}h ${newMinutes}m ${newSeconds}s`;
        break;
    }

    return timeSpanRes;
  }

  private static timeSpan(startDate: Date, endDate: Date): TimeSpanResponse {
    const startTime = Date.parse(startDate.toUTCString());
    const endTime = Date.parse(endDate.toUTCString());

    let diff = endTime - startTime;

    const days = Math.floor(diff / this.MILLIS_PER_DAY);
    diff -= days * this.MILLIS_PER_DAY;

    const hours = Math.floor(diff / this.MILLIS_PER_HOUR);
    diff -= hours * this.MILLIS_PER_HOUR;

    const mins = Math.floor(diff / this.MILLIS_PER_MINUTE);
    diff -= mins * this.MILLIS_PER_MINUTE;

    const seconds = Math.floor(diff / this.MILLIS_PER_SECOND);
    diff -= seconds * this.MILLIS_PER_SECOND;

    const timeSpanData = {
      days,
      hours,
      mins,
      seconds,
    };
    return timeSpanData;
  }

}
