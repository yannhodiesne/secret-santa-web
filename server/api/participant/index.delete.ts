export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const db = useDB();

  const year = new Date().getFullYear();

  const dbUser = await db.select({ id: tables.users.id }).from(tables.users).where(eq(tables.users.discordId, user.id)).get();

  if (!dbUser)
    return;

  await db.delete(tables.participants).where(and(
    eq(tables.participants.year, year),
    eq(tables.participants.userId, dbUser.id)
  ));
});
