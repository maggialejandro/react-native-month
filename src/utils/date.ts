import { LocaleType } from '../types';
import { leapYear } from './validations';

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getNumberOfDaysInMonth(month: number, year: number) {
  switch (month) {
    case 0:
      return 31;
    case 1:
      return leapYear(year) ? 29 : 28;
    case 2:
      return 31;
    case 3:
      return 30;
    case 4:
      return 31;
    case 5:
      return 30;
    case 6:
      return 31;
    case 7:
      return 31;
    case 8:
      return 30;
    case 9:
      return 31;
    case 10:
      return 30;
    case 11:
      return 31;
    default:
      return 30;
  }
}

export function getMonthNames(locale: LocaleType) {
  switch (locale) {
    case 'es':
      return [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];
    case 'en':
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
    case 'fr':
      return [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ];
    case 'zh':
      return [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ];
    case 'br':
      return [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ];
    case 'ru':
      return [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ];
    case 'uk':
      return [
        'Січень',
        'Лютий',
        'Березень',
        'Квітень',
        'Травень',
        'Червень',
        'Липень',
        'Серпень',
        'Вересень',
        'Жовтень',
        'Листопад',
        'Грудень',
      ];
    default:
      return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
  }
}

export function getWeekdayNames(locale: LocaleType) {
  switch (locale) {
    case 'es':
      return ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
    case 'en':
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    case 'fr':
      return ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    case 'br':
      return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
    case 'zh':
      return ['日', '一', '二', '三', '四', '五', '六'];
    case 'ru':
      return ['ВСК', 'ПНД', 'ВТР', 'СРД', 'ЧТВ', 'ПТН', 'СБТ'];
    case 'uk':
      return ['НЕД', 'ПНД', 'ВВТ', 'СРД', 'ЧТВ', 'ПТН', 'СБТ'];
    default:
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
}

export function getDayNames(locale: LocaleType, firstDayMonday: boolean) {
  const days = getWeekdayNames(locale);
  if (firstDayMonday) {
    const sunday = days.shift() as string;
    days.push(sunday);
    return days;
  }

  return days;
}
