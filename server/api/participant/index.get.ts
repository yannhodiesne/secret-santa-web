export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const db = useDB(event);

  const recipient = alias(tables.users, 'recipient');

  const year = new Date().getFullYear();

  const result = await db.select().from(tables.participants)
    .innerJoin(tables.users, eq(tables.users.id, tables.participants.userId))
    .leftJoin(recipient, eq(recipient.id, tables.participants.recipientId))
    .where(eq(tables.users.discordId, user.id))
    .get();

  const list = await db.select({
    id: tables.users.discordId,
    username: tables.users.username,
    avatar: tables.users.avatar
  })
    .from(tables.participants)
    .innerJoin(tables.users, eq(tables.users.id, tables.participants.userId))
    .where(eq(tables.participants.year, year));

  const participants = await db.select().from(tables.participants)
    .where(eq(tables.participants.year, year));

  return {
    registered: !!result,
    generated: participants.length > 0 && participants.every(p => !!p.recipientId),
    recipient: result?.recipient
      ? {
          id: result.recipient?.discordId,
          username: result.recipient?.username,
          avatar: result.recipient?.avatar
        }
      : undefined,
    list
  };
});
