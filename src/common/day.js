import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/zh-cn";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.locale("zh-cn");
dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);
dayjs.extend(utc);
dayjs.extend(timezone);

export default dayjs;
