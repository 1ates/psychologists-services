export const PAGE_SIZE = 3;

export const sortConfig = Object.freeze({
  all: { direction: "asc" },
  az: { child: "name", direction: "asc" },
  za: { child: "name", direction: "desc" },
  "price-low": { child: "price_per_hour", direction: "asc" },
  "price-high": { child: "price_per_hour", direction: "desc" },
  popular: { child: "rating", direction: "desc" },
  "not-popular": { child: "rating", direction: "asc" },
});

export const getSortConfig = (filter) => sortConfig[filter] || sortConfig.all;

export const getDisplayRecords = (records, filter, count) => {
  const orderedRecords = [...records];
  if (getSortConfig(filter).direction === "desc") orderedRecords.reverse();
  return orderedRecords.slice(0, count);
};
