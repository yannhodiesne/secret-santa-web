export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const { firstUser, secondUser } = await useValidatedBody(event, {
    firstUser: z.string().min(1),
    secondUser: z.string().min(1)
  });

  const db = useDB(event);

  // Check if the ids exists
  const existingUsers = await db.selectDistinct({ id: tables.users.id }).from(tables.users)
    .where(inArray(tables.users.discordId, [firstUser, secondUser]));

  if (existingUsers.length !== 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'IDs should be distinct and refer to existing users'
    });
  }

  // Add to database if not exists
  const existingUserIds = existingUsers.map(u => u.id);
  const existingConflict = db.select().from(tables.conflicts)
    .where(and(
      inArray(tables.conflicts.firstId, existingUserIds),
      inArray(tables.conflicts.secondId, existingUserIds)
    )).get();

  if (!existingConflict) {
    await db.insert(tables.conflicts).values({
      firstId: existingUserIds[0],
      secondId: existingUserIds[1]
    });
  }
});
