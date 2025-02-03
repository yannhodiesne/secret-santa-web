const shuffle = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generate = (participants: Participant[], conflicts: Conflict[], lastParticipants: Participant[]): boolean => {
  const max_attempts = 10;

  let i = 0;
  for (; i < max_attempts; i++) {
    // Reset all recipients before generating
    participants.forEach(p => p.recipientId = null);

    let current = participants.find(p => p.recipientId === null);

    do {
      if (current) {
        const userId = current.userId;

        const remainingParticipants = shuffle(
          participants.map(p => p.userId)
            .filter(id => id !== current?.userId)
            .filter(id => !participants.map(p => p.recipientId).includes(id))
            .filter(id => !conflicts.some(c => [c.firstId, c.secondId].includes(id) && [c.firstId, c.secondId].includes(userId)))
            .filter(id => !lastParticipants.some(p => p.userId === userId && p.recipientId == id))
        );

        if (remainingParticipants.length === 0) {
          // Dead-end, regenerate from scratch
          break;
        }

        current.recipientId = remainingParticipants[Math.floor(Math.random() * remainingParticipants.length)];
      }

      current = participants.find(p => p.recipientId === null);
    } while (current);

    if (participants.some(p => p.recipientId === null)) {
      // We hit a dead end, continue onto the next iteration
      continue;
    }

    break;
  };

  return i !== max_attempts || participants.every(p => p.recipientId !== null);
};
