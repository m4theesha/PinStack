export type Activity = {
  date: string; // YYYY-MM-DD
  count: number;
  level: number; // 0..maxLevel
};

type Week = Array<Activity | undefined>;

export type ActivityCalendarProps = {
  data: Activity[];
  blockSize?: number;
  blockMargin?: number;
  blockRadius?: number;
  fontSize?: number;
  maxLevel?: number;
  weekStart?: number; // 0 = Sunday
  hideMonthLabels?: boolean;
  hideWeekdayLabels?: boolean;
  colors?: string[]; // one per level, length maxLevel + 1
  labelColor?: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const GITHUB_DARK = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

const DAY_MS = 86_400_000;

function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1));
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

function fillHoles(data: Activity[]): Activity[] {
  if (data.length === 0) return [];
  const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
  const byDate = new Map(sorted.map((a) => [a.date, a]));
  const start = parseDate(sorted[0]!.date);
  const end = parseDate(sorted[sorted.length - 1]!.date);
  const days = Math.round((end.getTime() - start.getTime()) / DAY_MS);
  const result: Activity[] = [];
  for (let i = 0; i <= days; i++) {
    const date = formatDate(addDays(start, i));
    result.push(byDate.get(date) ?? { date, count: 0, level: 0 });
  }
  return result;
}

function groupByWeeks(data: Activity[], weekStart: number): Week[] {
  const activities = fillHoles(data);
  if (activities.length === 0) return [];
  const firstDay = parseDate(activities[0]!.date).getUTCDay();
  const padding = (firstDay - weekStart + 7) % 7;
  const padded: Week = [...Array<undefined>(padding).fill(undefined), ...activities];
  const weeks: Week[] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

function monthLabels(weeks: Week[]): Array<{ weekIndex: number; label: string }> {
  const labels: Array<{ weekIndex: number; label: string }> = [];
  weeks.forEach((week, weekIndex) => {
    const first = week.find((a) => a !== undefined);
    if (!first) return;
    const month = parseDate(first.date).getUTCMonth();
    const prev = labels[labels.length - 1];
    if (!prev || month !== parseDate(weeks[prev.weekIndex]!.find((a) => a)!.date).getUTCMonth()) {
      labels.push({ weekIndex, label: MONTHS[month]! });
    }
  });
  // Drop a leading label if the following one is too close, avoiding overlap.
  const first = labels[0];
  const second = labels[1];
  if (first && second && second.weekIndex - first.weekIndex < 3) labels.shift();
  return labels;
}

export function ActivityCalendar({
  data,
  blockSize = 10,
  blockMargin = 3,
  blockRadius = 2,
  fontSize = 12,
  maxLevel = 4,
  weekStart = 0,
  hideMonthLabels = false,
  hideWeekdayLabels = false,
  colors = GITHUB_DARK,
  labelColor = "rgb(240, 246, 252)",
}: ActivityCalendarProps) {
  const weeks = groupByWeeks(data, weekStart);
  const step = blockSize + blockMargin;
  const labelHeight = hideMonthLabels ? 0 : fontSize + blockMargin;
  const weekdayLabelWidth = hideWeekdayLabels ? 0 : fontSize * 2.2;
  const gridWidth = Math.max(0, weeks.length * step - blockMargin);
  const gridHeight = 7 * step - blockMargin;
  const colorFor = (level: number) => colors[Math.min(Math.max(level, 0), maxLevel)] ?? colors[0];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "MonaSans",
        fontSize,
        color: labelColor,
        width: weekdayLabelWidth + gridWidth,
      }}
    >
      {!hideMonthLabels && (
        <div
          style={{
            display: "flex",
            position: "relative",
            height: labelHeight,
            marginLeft: weekdayLabelWidth,
            width: gridWidth,
          }}
        >
          {monthLabels(weeks).map(({ weekIndex, label }) => (
            <span
              key={`${label}-${weekIndex}`}
              style={{ position: "absolute", left: weekIndex * step, top: 0, lineHeight: 1 }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "row" }}>
        {!hideWeekdayLabels && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: weekdayLabelWidth,
              height: gridHeight,
            }}
          >
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: blockSize,
                  marginBottom: i === 6 ? 0 : blockMargin,
                  lineHeight: 1,
                }}
              >
                {i % 2 === 1 ? WEEKDAYS[(weekStart + i) % 7] : ""}
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "row", width: gridWidth, height: gridHeight }}>
          {weeks.map((week, wi) => (
            <div
              key={wi}
              style={{
                display: "flex",
                flexDirection: "column",
                width: blockSize,
                marginRight: wi === weeks.length - 1 ? 0 : blockMargin,
              }}
            >
              {Array.from({ length: 7 }, (_, di) => {
                const activity = week[di];
                return (
                  <div
                    key={di}
                    style={{
                      display: "flex",
                      width: blockSize,
                      height: blockSize,
                      marginBottom: di === 6 ? 0 : blockMargin,
                      borderRadius: blockRadius,
                      backgroundColor: activity ? colorFor(activity.level) : "transparent",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
