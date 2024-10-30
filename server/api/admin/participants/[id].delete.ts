export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const { id } = await useValidatedParams(event, {
    id: z.string().min(1)
  });

  const db = useDB(event);

  const year = new Date().getFullYear();

  const dbUser = await db.select({ id: tables.users.id }).from(tables.users).where(eq(tables.users.discordId, id)).get();

  if (!dbUser)
    return;

  await db.delete(tables.participants)
    .where(and(
      eq(tables.participants.year, year),
      eq(tables.participants.userId, dbUser.id)
    ));
});
