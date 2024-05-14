import dayjs from "dayjs";
import relativePlugin from 'dayjs/plugin/relativeTime';
import ru from 'dayjs/locale/ru';


dayjs.extend(relativePlugin);
dayjs.locale(ru);

export function fromDate(date: string | Date, suffix?: boolean): string {
    return dayjs(date).fromNow(suffix)
}

export function convertToRussian(date: string | Date, datetime?: boolean): string {
    const format = !!datetime ? 'DD.MM.YY HH:mm' : 'DD.MM.YYYY'
    return dayjs(date).format(format)
}


// @ts-ignore
export function toRGB(str: string): string {
    var hash = 0;
    if (str.length === 0) return 'rgb(0, 0, 0)';
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }
    var rgb = [0, 0, 0];
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 255;
        rgb[i] = value;
    }
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }
  