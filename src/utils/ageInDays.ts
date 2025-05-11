// src/utils/ageFormatter.ts

export const formatAge = (days: number): string => {
  const pluralize = (
    count: number,
    one: string,
    few: string,
    many: string
  ): string => {
    if (count % 10 === 1 && count % 100 !== 11) return one;
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100))
      return few;
    return many;
  };

  if (days < 30) {
    return `${days} ${pluralize(days, "день", "дні", "днів")}`;
  } else if (days < 365) {
    const months = Math.round(days / 30);
    return `${months} ${pluralize(months, "місяць", "місяці", "місяців")}`;
  } else {
    const years = Math.floor(days / 365);
    return `${years} ${pluralize(years, "рік", "роки", "років")}`;
  }
};
