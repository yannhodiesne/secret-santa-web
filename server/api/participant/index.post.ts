export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const db = useDB();

  // Insert current user if missing
  let dbUser = await db.select({ id: tables.users.id }).from(tables.users).where(eq(tables.users.discordId, user.id)).get();

  if (!dbUser) {
    dbUser = await db.insert(tables.users).values({
      discordId: user.id,
      username: user.username,
      avatar: user.avatar,
    }).returning().get();
  }

  // Insert participation for the current user if missing
  const year = new Date().getFullYear();

  let dbParticipant = await db.select({ id: tables.participants.userId }).from(tables.participants).where(and(
    eq(tables.participants.userId, dbUser.id),
    eq(tables.participants.year, year)
  )).get();

  if (!dbParticipant) {
    await db.insert(tables.participants).values({
      userId: dbUser.id,
      year
    });
  }
});
