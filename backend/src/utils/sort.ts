const ALLOWED_FIELDS = new Set([
  "createdAt", "updatedAt", "name", "fullName", "email", "phone",
  "travelDate", "travelers", "amount", "status", "tourTitle",
  "isRead", "isActive",
]);

export function parseSort(sort?: string, defaultField = "createdAt", defaultOrder: 1 | -1 = -1): Record<string, 1 | -1> {
  if (!sort) return { [defaultField]: defaultOrder };

  const parts = sort.split(",");
  const result: Record<string, 1 | -1> = {};

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    let field: string;
    let order: 1 | -1;

    if (trimmed.startsWith("-")) {
      field = trimmed.slice(1);
      order = -1;
    } else {
      field = trimmed;
      order = 1;
    }

    if (ALLOWED_FIELDS.has(field)) {
      result[field] = order;
    }
  }

  return Object.keys(result).length > 0 ? result : { [defaultField]: defaultOrder };
}
