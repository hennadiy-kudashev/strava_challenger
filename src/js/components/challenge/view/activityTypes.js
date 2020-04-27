export const groupBy = (items, key) => items.reduce(
  (result, item) => ({
    ...result,
    [item[key]]: [
      ...(result[item[key]] || []),
      item,
    ],
  }),
  {},
);

export default function groupByActivityType(athletes) {
  const map = {};
  athletes.forEach((athlete) => {
    const grouped = groupBy(athlete.activities, 'type');
    Object.keys(grouped).forEach(type => {
      const activities = map[type];
      if (!activities) {
        map[type] = [];
      }
      map[type].push({
        athlete,
        activities: grouped[type],
      });
    });
  });
  return map;
}
