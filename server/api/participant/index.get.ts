export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const db = useDB(event);

  const recipient = alias(tables.users, 'recipient');

  const result = await db.select().from(tables.participants)
    .innerJoin(tables.users, eq(tables.users.id, tables.participants.userId))
    .leftJoin(recipient, eq(recipient.id, tables.participants.recipientId))
    .where(eq(tables.users.discordId, user.id))
    .get();

  return {
    registered: !!result,
    recipient: !!result?.recipient ? {
      id: result.recipient?.discordId,
      username: result.recipient?.username,
      avatar: result.recipient?.avatar
    } : undefined
  };
});
