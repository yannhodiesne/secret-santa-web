import { expect, test } from 'vitest';
import type { Conflict, Participant } from '~~/server/utils/db';
import { generate } from '~~/server/utils/generate';

test('generation succeeds with 0 constraints', () => {
  const participants: Participant[] = [{
    userId: 1,
    year: 2024,
    recipientId: null
  },
  {
    userId: 2,
    year: 2024,
    recipientId: null
  },
  {
    userId: 3,
    year: 2024,
    recipientId: null
  },
  {
    userId: 4,
    year: 2024,
    recipientId: null
  }];

  const conflicts: Conflict[] = [];

  expect(generate(participants, conflicts)).toBe(true);

  const recipientIds = participants.map(p => p.recipientId);

  // Check for all recipients to be filled
  expect(recipientIds).not.toContain(null);
  // Ensure no duplicate recipients
  expect(recipientIds.filter((p, i) => recipientIds.indexOf(p) !== i));
});

test('generation succeeds with a simple constraint', () => {
  const participants: Participant[] = [{
    userId: 1,
    year: 2024,
    recipientId: null
  },
  {
    userId: 2,
    year: 2024,
    recipientId: null
  },
  {
    userId: 3,
    year: 2024,
    recipientId: null
  },
  {
    userId: 4,
    year: 2024,
    recipientId: null
  }];

  const conflicts: Conflict[] = [{
    firstId: 1,
    secondId: 2
  }];

  expect(generate(participants, conflicts)).toBe(true);

  expect(participants[0]?.recipientId).not.toEqual(2);
  expect(participants[1]?.recipientId).not.toEqual(1);

  const recipientIds = participants.map(p => p.recipientId);

  // Check for all recipients to be filled
  expect(recipientIds).not.toContain(null);
  // Ensure no duplicate recipients
  expect(recipientIds.filter((p, i) => recipientIds.indexOf(p) !== i));
});

test('generation fails instead of breaking constraints', () => {
  const participants: Participant[] = [{
    userId: 1,
    year: 2024,
    recipientId: null
  },
  {
    userId: 2,
    year: 2024,
    recipientId: null
  },
  {
    userId: 3,
    year: 2024,
    recipientId: null
  }];

  const conflicts: Conflict[] = [{
    firstId: 1,
    secondId: 2
  }];

  expect(generate(participants, conflicts)).toBe(false);
});

test('generation does not result in a self-santa', () => {
  const participants: Participant[] = [{
    userId: 1,
    year: 2024,
    recipientId: null
  }];

  const conflicts: Conflict[] = [];

  expect(generate(participants, conflicts)).toBe(false);
});

test('generation does not result in a duplicate', () => {
  // Not a real scenario, but used to ensure the generation is invalidated
  // instead of giving the same recipient ID to 2 different participants
  const participants: Participant[] = [{
    userId: 1,
    year: 2024,
    recipientId: null
  },
  {
    userId: 1,
    year: 2024,
    recipientId: null
  },
  {
    userId: 2,
    year: 2024,
    recipientId: null
  },
  {
    userId: 3,
    year: 2024,
    recipientId: null
  },
  {
    userId: 4,
    year: 2024,
    recipientId: null
  }];

  const conflicts: Conflict[] = [];

  expect(generate(participants, conflicts)).toBe(false);
});
