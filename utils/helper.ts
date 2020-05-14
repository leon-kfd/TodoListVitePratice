export const DateFormat = (date: Date | string | number, formatter: string = 'yyyy-MM-dd'): string => {
  if (typeof date !== 'object') {
    date = new Date(date)
  }
  const opt = {
    "y+": date.getFullYear().toString(),        // 年
    "M+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "m+": date.getMinutes().toString(),         // 分
    "s+": date.getSeconds().toString()          // 秒
  };
  for (let k in opt) {
    const ret = new RegExp("(" + k + ")").exec(formatter);
    if (ret) {
      formatter = formatter.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return formatter;
}

export const DateCompute = (date: Date | string | number, type: string = 'add', time: number) => {
  if (typeof date !== 'object') {
    date = new Date(date)
  }
  if (type === 'add') {
    return date.setTime(date.getTime() + time)
  } else {
    return date.setTime(date.getTime() - time)
  }
}