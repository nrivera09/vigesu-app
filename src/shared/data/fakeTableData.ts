// src/shared/data/fakeTableData.ts
import { faker } from "@faker-js/faker";

export interface TableRow {
  id: number;
  selected: boolean;
  worker: string;
  role: string;
  sync: boolean;
}

export function generateFakeTableData(count = 20): TableRow[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    selected: Math.random() > 0.5,
    worker: faker.person.fullName(),
    role: faker.person.jobTitle(),
    sync: Math.random() > 0.5,
  }));
}
