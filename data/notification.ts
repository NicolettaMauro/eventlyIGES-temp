// /data/notification.ts
import { db } from "@/lib/db";

export type UserNotificationItem = {
  id: string;
  title: string;
  message: string;
  link: string | null;
  createdAt: Date;
};

export async function getUserNotifications(
  userId: string,
  page: number,
  limit: number
): Promise<UserNotificationItem[]> {
  if (!userId) return [];

  const rows = await db.notification.findMany({
    where: { userNotifications: { some: { userId } } },
    select: { id: true, title: true, message: true, link: true, createdAt: true },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });

  return rows;
}
