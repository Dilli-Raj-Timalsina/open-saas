/**
 @name ISO8601 format represents date/time in a Coordinated Universal Time (UTC), which is a universal time zone and all other time zone are derived from this timezone .
 @example 2024-06-10T03:05:24.169Z , 
 "2024-06-10": Represents the date in the format "YYYY-MM-DD" (Year-Month-Day).
 "T": Serves as a separator to indicate the beginning of the time component.
 "03:05:24.169": Represents the time in the format "HH:mm:ss.SSS" (Hours:Minutes:Seconds.Milliseconds).
 "Z": Indicates that the timestamp is in Coordinated Universal Time (UTC), equivalent to a time zone offset of "+00:00". The "Z" stands for "Zulu time", which is a way of denoting UTC.
 @default am/pm there is no concept of am pm in utc time format since am pm is used in 12 hour clock system meanwhile utc uses 24hrs clock system which ranges from 0 to 23:59:59 .

 There are other timezones besides utc timezone as mentioned below :
 a)  Nepal Standard Time (NST)= UTC+5:45. 
 b)  Central European Time (CET) for Germany = utc + 1.


 Besides the ISO 8601 format, there are several other common time and date formats used in various contexts. Here are a few examples with explanations:

RFC 822 / RFC 1123 Format:

Format: "Wed, 09 Jun 2024 15:30:00 GMT"
Explanation: This format is standardized by RFC 822 and RFC 1123 for email message headers and web timestamping. It includes the day of the week (short form), day of the month, month (short form), year, time (24-hour format), and the time zone. The time zone is specified as an abbreviation like "GMT" (Greenwich Mean Time).

Long Date Format:
Format: "June 10, 2024 3:30:00 PM UTC"
Explanation: This format includes the month name, day of the month, year, time (12-hour format), and the time zone specified as an abbreviation such as "UTC".

Unix Timestamp (Epoch Time):
Format: 1739430000
Explanation: Epoch time represents the number of seconds (or milliseconds) that have elapsed since the Unix epoch (January 1, 1970, 00:00:00 UTC). It is a simple integer format that allows for easy manipulation and comparison of dates and times in programming.

Short Date Format:
Format: "09/23/2024 15:30:00"
Explanation: This format represents the date in the "MM/DD/YYYY" format and includes the time in 24-hour format. The time zone is typically omitted in this format.

Sortable Date & Time Format:
Format: "2024-06-10T15:30:00Z"
Explanation: Similar to ISO 8601, this format includes the date in "YYYY-MM-DD" format, the time in 24-hour format, and the "Z" at the end to indicate UTC time.

Custom Date Format:
Format: "10-June-2024 03:30:00 PM UTC"
Explanation: Custom date formats can vary widely and may include elements like day name, month name, year, time in 12-hour format with AM/PM markers, and the time zone specified as an abbreviation.


 @name DST (Daylight saving time) is a practice where clocks are set forward by one hour during the warmer months, typically in spring, and then set back by one hour in the fall to return to standard time. The primary purpose of daylight saving time is to make better use of daylight during the longer days of the year, particularly in the evening.

 The main benefits often cited for DST include:

 Energy Conservation: By adjusting the clock forward during the longer daylight hours of spring and summer, it's assumed that people will use less energy for lighting and heating in the evening.

 Extended Daylight Hours: Moving the clock forward allows for more daylight in the evening, which can have various positive impacts on activities such as outdoor recreation, retail sales, and tourism.

 @name unix_timestamp The Unix timestamp, also known as Epoch time or POSIX time, is a way to represent a point in time as the number of seconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC) on Thursday, January 1, 1970 (not counting leap seconds). This standard time reference is often known as the Unix epoch.
  e.g 1717997587484



 */

import { HttpException } from '@nestjs/common';

/**
  Date and Times in Javascript/Nodejs enviroment . 

  1. new Date() - In nodejs enviroment it picks time from your computer/system at current moment .
  2. new Date() - In browser enviroment it picks time from the default time set in your system/device setting , it could vary on each user based on their device . so It's always a good practice to pick/retrieve time from your server/nodejs process for time consistency throughout the system .

  Let's Learn few Date methods in nodejs enviroment .
  1. new Date(); //  2024-06-10T03:05:24.169Z -- returns current time in utc/iso  format
  2. new Date().toISOString(); // 2024-06-10T03:05:24.169Z -- converts date in iso format 
  3. new Date().toString(); //  Mon Jun 10 2024 11:08:01 GMT+0545 (Nepal Time) -- returns date converted into local timezone , the last part GMT+0545 (Nepal Time) is symbol of timezone .
  4. new Date().toUTCString(); // Mon, 10 Jun 2024 05:25:39 GMT , returns date in utc string format 
  5. new Date().toTimeString(); //11:11:56 GMT+0545 (Nepal Time) returns time in local string format
  6. new Date().toLocaleString(); //6/10/2024, 11:13:28 AM return date in local string format 
  7. new Date().toLocaleDateString(); //6/20/2024 , return date in local string format
  8. new Date().getTime(); //1717997587484 return time in unixtimestamp . 

  Note : There are several get and set method of javascript Date() object which you can google and learn more about it as per your need . 
  e.g getHours() , setHours() , setMonths()   etcc..
  */

/**
 * There is a famous library named momentjs , which is used to work on date and time in javscript .
 */

export function createUTCDate(date: Date, timeStr: string): Date {
  const dateTimeStr = `${date}T${timeStr}:00Z`;
  return new Date(dateTimeStr);
}

/**
 * @param date : accepts full date string as date object e.g "2024-06-25T18:15:00.000Z"
 * @returns : returns only date part of the full date string e.g "2024-06-25"
 * @Note date.getMonth() return date as 0 = jan 1= feb so we have to add extra 1 to get extact month matching
 */
export function getDateOnly(date: Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return `${date.getFullYear()}-${
    date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
}

export function getDateFormatDDMMYYYY(date: Date): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  const month =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

/**
 *
 * @param date : from which date to subract (date in utc format) e.g : "2024-06-25T18:15:00.000Z"
 * @param days : no of days to be subtracted
 * @returns : date only string of subtracted date + 1 because if date 2022-12-12 and days == 1 then it should return 2022-12-12 because it wants only 1 days .
 */
export function subtractDate(date: Date, days: number): string {
  const result = new Date(date);
  result.setDate(result.getDate() - days + 1);
  return getDateOnly(result);
}

/**
 *
 * @param date : input date in utc format
 * @param days : number of days to be added
 * @returns : return new Date object after adding inputted no of days
 */
export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

/**
 * e.g (date=2080/2081, add) returns 2081/2082
 * e.g (date=2080/2081, subtract) return 2079/2080
 */
export function fiscalDateArthemetic(
  date: string,
  action: 'add' | 'subtract',
): string {
  const match = date.match(/^(\d{4})\/(\d{4})$/); // returns ['2021/2022','2021','2022]
  if (!match) {
    throw new HttpException('date should be fiscal format e.g YYYY/YYYY', 400);
  }

  return action == 'add'
    ? `${Number(match[1]) + 1}/${Number(match[2]) + 1}`
    : `${Number(match[1]) - 1}/${Number(match[2]) - 1}`;
}
