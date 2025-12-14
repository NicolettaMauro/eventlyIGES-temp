// /app/notifications/page.tsx
import { currentUser } from "@/lib/auth";
import EmptyState from "@/components/altre/empty-state";
import NotificationsClient from "@/components/altre/notification";
import { getUserNotifications } from "@/data/notification";

const NotificationsPage = async () => {
  const user = await currentUser();

  if (!user || !user.id) {
    return <EmptyState title="Non hai i permessi" subtitle="Effettua il login" />;
  }

  const firstPage = await getUserNotifications(user.id, 1, 20);

  if (firstPage.length === 0) {
    return (
      <EmptyState
        title="Nessuna notifica"
        subtitle="Qui vedrai gli aggiornamenti importanti."
        showToHome
      />
    );
  }

  return <NotificationsClient initialData={firstPage} userId={user.id} />;
};

export default NotificationsPage;
