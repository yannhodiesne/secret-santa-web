export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const db = useDB(event);

  // Insert current user if missing
  let dbUser = db.select({ id: tables.users.id }).from(tables.users).where(eq(tables.users.discordId, user.id)).get();

  if (!dbUser) {
    dbUser = db.insert(tables.users).values({
      discordId: user.id,
      username: user.username,
      nick: user.nick,
      avatar: user.avatar
    }).returning().get();
  }

  // Insert participation for the current user if missing
  const year = new Date().getFullYear();

  const dbParticipant = db.select({ id: tables.participants.userId }).from(tables.participants).where(and(
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
