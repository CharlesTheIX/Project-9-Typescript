"use client";
import { useState, useEffect } from "react";
import { useUserContext } from "@/contexts/userContext";
import LoadingContainer from "@/components/LoadingContainer";
import { useImpersonationContext } from "@/contexts/impersonationContext";
import acceptContactInvitation from "@/lib/notifications/acceptContactInvitation";
import getNotificationsContainingParticipants from "@/lib/notifications/getNotificationsContainingParticipants";

type Props = {
  pingErrorLimit?: number;
  pingIntervalTime?: number;
};

const ProfileNotificationsFeed: React.FC<Props> = (props: Props) => {
  const { pingErrorLimit = 3, pingIntervalTime = 10000 } = props;
  const { user } = useUserContext();
  const impersonate = useImpersonationContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pingLoading, setPingLoading] = useState<boolean>(false);
  const [pingErrorCount, setPingErrorCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Partial<NotificationData>[]>([]);

  const getNotifications = async (): Promise<void> => {
    setPingLoading(true);
    setIsLoading(true);
    var targetUser = impersonate.user ? impersonate.user : user;

    try {
      if (!targetUser) throw new Error("no active user.");
      const response = await getNotificationsContainingParticipants({
        options: {},
        participants: [`${targetUser._id}`],
      });
      if (response.error) throw new Error(response.message);
      setNotifications(response.data);
      setPingLoading(false);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setNotifications([]);
      setPingLoading(false);
      setPingErrorCount(pingErrorCount + 1);
    }
  };

  const acceptInvitation = async (notificationId: string): Promise<void> => {
    setIsLoading(true);
    var targetUser = impersonate.user ? impersonate.user : user;

    try {
      if (!targetUser) throw new Error("no active user.");
      const invitationResponse = await acceptContactInvitation(notificationId);
      if (invitationResponse.error) throw new Error(invitationResponse.message);
      const notificationResponse = await getNotificationsContainingParticipants({
        options: {},
        participants: [`${targetUser._id}`],
      });
      if (notificationResponse.error) throw new Error(notificationResponse.message);
      setNotifications(notificationResponse.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      setNotifications([]);
    }
  };

  useEffect(() => {
    setPingLoading(true);
    setIsLoading(true);
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
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <div className="flex flex-col gap-0 w-full items-start justify-start">
          <div className="flex flex-row justify-between w-full px-5 pb-5">
            <p className="text-3xl font-bold w-full">Notifications</p>

            {pingLoading && (
              <div className="w-auto fade-in">
                <LoadingContainer size={24} />
              </div>
            )}
          </div>

          {!notifications || notifications.length === 0 ? (
            <p className="px-5">No notifications found</p>
          ) : (
            <div className="scrollbar-y flex flex-col h-auto w-full gap-5 max-h-[500px]">
              {notifications?.map((notification: Partial<NotificationData>, key: number) => {
                console.log();
                switch (notification.type) {
                  case "invitation":
                    return (
                      <div key={key} className="w-full px-5">
                        <div className="flex flex-row gap-2 items-center justify-between">
                          <p>{notification.subject}</p>

                          <button
                            className="button"
                            onClick={async () => {
                              await acceptInvitation(notification._id || "");
                            }}
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div key={key} className="w-full px-5">
                        <div className="flex flex-row gap-2 items-center justify-between">
                          <p>{notification.subject}</p>
                        </div>
                      </div>
                    );
                }
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileNotificationsFeed;
