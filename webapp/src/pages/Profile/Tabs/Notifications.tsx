"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/userContext";
import LoadingContainer from "@/components/LoadingContainer";
import { useImpersonationContext } from "@/contexts/impersonationContext";
import getNotificationsContainingParticipants from "@/functions/notifications/getNotificationsContainingParticipants";

type Props = {
  pingErrorLimit?: number;
  pingIntervalTime?: number;
};

const NotificationsTab: React.FC<Props> = (props: Props) => {
  const { pingErrorLimit = 3, pingIntervalTime = 10000 } = props;
  const { user } = useUserContext();
  const impersonate = useImpersonationContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [pingLoading, setPingLoading] = useState<boolean>(false);
  const [pingErrorCount, setPingErrorCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<NotificationData[] | null>(null);

  useEffect(() => {
    var targetUser = impersonate.user ? impersonate.user : user;
    setPingLoading(true);
    setLoading(true);
    
    const getNotifications = async (): Promise<void> => {
      try {
        if (!targetUser) throw new Error("no active user.");
        const response = await getNotificationsContainingParticipants([`${targetUser._id}`]);
        if (response.error) throw new Error(response.message);
        setNotifications(response.data);
        setPingLoading(false);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        setNotifications([]);
        setPingLoading(false);
        setPingErrorCount(pingErrorCount + 1);
      }
    };
    const ping = setInterval(async (): Promise<void> => {
      if (pingErrorCount >= pingErrorLimit) {
        clearInterval(ping);
        return;
      }

      setPingLoading(true);
      await getNotifications();
    }, pingIntervalTime);

    getNotifications();

    return () => {
      clearInterval(ping);
    };
  }, [user, impersonate.user]);

  return (
    <div className="flex flex-col items-center py-5">
      {loading ? (
        <LoadingContainer />
      ) : (
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <div className="flex flex-row justify-between w-full px-5 pb-5">
            <p className="text-3xl font-bold">Notifications</p>

            {pingLoading && <LoadingContainer size={24} />}
          </div>

          {!notifications || notifications.length === 0 ? (
            <p className="px-5">No notifications found</p>
          ) : (
            <div className="scrollbar-y flex flex-col h-auto w-full gap-5 max-h-[500px]">
              {notifications?.map((notification: NotificationData, key: number) => {
                return (
                  <div key={key} className="w-full px-5">
                    <p>{notification.subject}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsTab;
