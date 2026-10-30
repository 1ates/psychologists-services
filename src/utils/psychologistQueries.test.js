import { describe, expect, it } from "vitest";
import { PAGE_SIZE, getDisplayRecords, getSortConfig } from "./psychologistQueries";

describe("psychologist query helpers", () => {
  it("uses three records as the initial page size", () => {
    expect(PAGE_SIZE).toBe(3);
  });

  it("maps each filter to the expected database sort field and direction", () => {
    expect(getSortConfig("az")).toEqual({ child: "name", direction: "asc" });
    expect(getSortConfig("za")).toEqual({ child: "name", direction: "desc" });
    expect(getSortConfig("price-low")).toEqual({ child: "price_per_hour", direction: "asc" });
    expect(getSortConfig("price-high")).toEqual({ child: "price_per_hour", direction: "desc" });
    expect(getSortConfig("popular")).toEqual({ child: "rating", direction: "desc" });
    expect(getSortConfig("not-popular")).toEqual({ child: "rating", direction: "asc" });
  });

  it("reverses descending query results and limits the visible page", () => {
    const records = [{ id: "low" }, { id: "middle" }, { id: "high" }, { id: "extra" }];
    expect(getDisplayRecords(records, "popular", 3).map(({ id }) => id)).toEqual(["extra", "high", "middle"]);
    expect(getDisplayRecords(records, "az", 3).map(({ id }) => id)).toEqual(["low", "middle", "high"]);
  });
});
