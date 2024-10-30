export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const { firstId, secondId } = await useValidatedParams(event, {
    firstId: z.string().min(1),
    secondId: z.string().min(1)
  });

  const db = useDB(event);

  // Check if the ids exists
  const existingUsers = await db.selectDistinct({ id: tables.users.id }).from(tables.users)
    .where(inArray(tables.users.discordId, [firstId, secondId]));

  if (existingUsers.length !== 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'IDs should be distinct and refer to existing users'
    });
  }

  // Remove from database if exists
  const existingUserIds = existingUsers.map(u => u.id);
  await db.delete(tables.conflicts)
    .where(and(
      inArray(tables.conflicts.firstId, existingUserIds),
      inArray(tables.conflicts.secondId, existingUserIds)
    ));
});
