export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const db = useDB(event);

  // Generate mappings for the current year
  const year = new Date().getFullYear();

  const participants = await db.select().from(tables.participants)
    .where(eq(tables.participants.year, year));

  const conflicts = await db.select().from(tables.conflicts);

  const generate = () => {
    console.log("Generating matches");

    // Reset all recipients before generating
    participants.forEach(p => p.recipientId = null);

    let current = participants.find(p => p.recipientId === null);

    do {
      if (!!current) {
        const userId = current.userId;

        const remainingParticipants = shuffle(
          participants.map(p => p.userId)
            .filter(id => !participants.map(p => p.recipientId).includes(id))
            .filter(id => !conflicts.some(c => [c.firstId, c.secondId].includes(id) && [c.firstId, c.secondId].includes(userId)))
        );

        if (remainingParticipants.length === 0) {
          console.error("Dead end ! Re-generating from scratch...");
          return generate();
        }

        current.recipientId = remainingParticipants[Math.floor(Math.random() * remainingParticipants.length)];
      }

      current = participants.find(p => p.recipientId === null);
    } while(!!current);

    console.log("Matches generated");
  };

  generate();

  await Promise.all(
    participants.map(p =>
      db.update(tables.participants)
        .set({ recipientId: p.recipientId })
        .where(and(
          eq(tables.participants.year, year),
          eq(tables.participants.userId, p.userId)
        ))
    )
  );
});

const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
