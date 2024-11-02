export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const db = useDB(event);

  // Check if mappings are already generated for the current year
  const year = new Date().getFullYear();

  const participants = await db.select().from(tables.participants)
    .where(eq(tables.participants.year, year));

  const partialGeneration = participants.some(p => !!p.recipientId) && participants.some(p => !p.recipientId);

  const recipientIds = participants.map(p => p.recipientId).filter(x => x !== null);
  const doubleRecipient = recipientIds.some((p, i) => recipientIds.indexOf(p) !== i);

  return {
    generated: participants.length > 0 && participants.every(p => !!p.recipientId),
    error: partialGeneration || doubleRecipient
  };
});
