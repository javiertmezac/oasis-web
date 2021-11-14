export class DateTimeHandler {
  static getDateTimeOffSet(): number {
    const date = new Date();
    return date.getTimezoneOffset() * 60 * 1000;
  }

  static getCurrentTimeMil(): number {
    const dateTime = new Date();
    const hourMil = dateTime.getHours() * 60 * 60 * 1000;
    const minmil = dateTime.getMinutes() * 60 * 1000;
    const secMil = dateTime.getSeconds() * 1000;
    return  hourMil + minmil + secMil;
  }
}