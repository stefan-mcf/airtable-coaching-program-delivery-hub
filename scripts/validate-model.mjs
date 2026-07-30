import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const model = await readJson(new URL("../contracts/model.json", import.meta.url));
const interfaces = await readJson(new URL("../contracts/interfaces.json", import.meta.url));

assert.deepEqual(
  model.tables.map((table) => table.name),
  ["Coaches", "Participants", "Coaching Plans", "Sessions"],
);
assert.equal(model.tables.reduce((total, table) => total + table.count, 0), model.total_records);
assert.equal(model.total_records, 66);
assert.equal(model.verified_relationships, 108);

assert.equal(interfaces.role_interfaces.length, 3);
for (const page of interfaces.role_interfaces) {
  assert.equal(page.filter.field, "coach_user");
  assert.equal(page.filter.operator, "has any of");
  assert.equal(page.filter.value, "Current user");
}
assert.equal(interfaces.external_invitations_created, 0);
assert.equal(interfaces.public_share_links_created, 0);
assert.equal(interfaces.identity_assignment_complete, false);

console.log("Airtable coaching model and Interface contracts are valid.");
