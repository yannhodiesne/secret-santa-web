export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const db = useDB(event);

  const firstUser = alias(tables.users, 'firstUser');
  const secondUser = alias(tables.users, 'secondUser');

  const result = await db.select({
    firstUser: {
      id: firstUser.discordId,
      username: firstUser.username,
      avatar: firstUser.avatar
    },
    secondUser: {
      id: secondUser.discordId,
      username: secondUser.username,
      avatar: secondUser.avatar
    } })
    .from(tables.conflicts)
    .innerJoin(firstUser, eq(firstUser.id, tables.conflicts.firstId))
    .innerJoin(secondUser, eq(secondUser.id, tables.conflicts.secondId));

  return result;
});
