import { generate } from '~~/server/utils/generate';

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const db = useDB(event);

  // Generate mappings for the current year
  const year = new Date().getFullYear();

  const participants = await db.select().from(tables.participants)
    .where(eq(tables.participants.year, year));

  const lastParticipants = await db.select().from(tables.participants)
    .where(eq(tables.participants.year, year - 1));

  const conflicts = await db.select().from(tables.conflicts);

  const success = generate(participants, conflicts, lastParticipants);

  if (!success) {
    console.error('Dead end ! Too many constraints');
    throw createError({ statusCode: 409, statusMessage: 'Conflict' });
  }

  await Promise.all(
    participants.map(p =>
      db.update(tables.participants)
        .set({ recipientId: p.recipientId })
        .where(and(
          eq(tables.participants.year, year),
          eq(tables.participants.userId, p.userId)
        ))
    )
  );
});
