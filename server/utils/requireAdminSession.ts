import { UserSessionRequired } from "#auth-utils";
import { H3Event } from "h3";

export async function requireAdminSession(event: H3Event, opts: { statusCode?: number, message?: string } = {}): Promise<UserSessionRequired> {
  const userSession = await requireUserSession(event);
  const { user } = userSession;

  if (user.role !== 'admin') {
    throw createError({
      statusCode: opts.statusCode || 403,
      message: opts.message || 'Unauthorized',
    });
  }

  return userSession;
}
