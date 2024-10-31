export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const { id } = await useValidatedParams(event, {
    id: z.string().min(1)
  });

  const db = useDB(event);

  const year = new Date().getFullYear();

  // If the Secret Santa has already been generated this year, do not delete anything
  const participants = await db.select().from(tables.participants)
    .where(eq(tables.participants.year, year));

  if (participants.length > 0 && participants.every(p => !!p.recipientId))
    return;

  const dbUser = await db.select({ id: tables.users.id }).from(tables.users).where(eq(tables.users.discordId, id)).get();

  if (!dbUser)
    return;

  await db.delete(tables.participants)
    .where(and(
      eq(tables.participants.year, year),
      eq(tables.participants.userId, dbUser.id)
    ));
});
