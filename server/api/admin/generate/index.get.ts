export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const db = useDB(event);

  // Check if mappings are already generated for the current year
  const year = new Date().getFullYear();

  const participants = await db.select().from(tables.participants)
    .where(eq(tables.participants.year, year));

  return {
    generated: participants.length > 0 && participants.every(p => !!p.recipientId),
    error: participants.some(p => !!p.recipientId) && !participants.every(p => !!p.recipientId)
  };
});
