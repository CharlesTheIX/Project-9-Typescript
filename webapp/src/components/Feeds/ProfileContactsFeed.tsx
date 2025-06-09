"use client";
import Image from "next/image";
import Close_SVG from "@/SVGs/Close_SVG";
import { useState, useEffect } from "react";
import Pending_SVG from "@/SVGs/Pending_SVG";
import Success_SVG from "@/SVGs/Success_SVG";
import { useUserContext } from "@/contexts/userContext";
import getUserContacts from "@/lib/users/getUserContacts";
import LoadingContainer from "@/components/LoadingContainer";

const ProfileContactsFeed: React.FC = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Partial<User>[]>([]);

  const fetchContacts = async (): Promise<void> => {
    if (!user) return;
    setIsLoading(true);

    try {
      var response: ApiResponse = await getUserContacts({ _id: user._id || "", options: {} });
      if (response.error) throw new Error(response.message);
      setContacts(response.data || []);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
    }
  };

  const getIsTargetUserContactStatus = (targetUserId: string): UserContactStatus | false => {
    if (!user?.contacts) return false;
    const contact = user?.contacts.find((contact: UserContactData) => contact.userId === targetUserId);
    if (!contact) return false;
    return contact.status;
  };

  useEffect(() => {
    (async () => {
      await fetchContacts();
    })();
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 items-start">
        <div className="flex flex-row flex-wrap gap-5 items-center">
          <>
            {isLoading ? (
              <LoadingContainer />
            ) : (
              <>
                {contacts.length === 0 ? (
                  <p>No contacts to display.</p>
                ) : (
                  <>
                    {contacts.map((contactUser: Partial<User>, key: number) => {
                      const targetUserContactStatus = getIsTargetUserContactStatus(contactUser?._id || "");
                      console.log(targetUserContactStatus);

                      return (
                        <div
                          key={key}
                          className="profile-contact-card card flex flex-row gap-10 items-center justify-between p-2"
                        >
                          <div className="flex flex-row gap-2 items-center justify-start w-full">
                            <div
                              className="image-wrapper"
                              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                            >
                              <Image
                                width={100}
                                height={100}
                                alt="profile image"
                                src={
                                  contactUser.profileImageUrl?.replace("http://localhost:3022", "") ||
                                  "/assets/images/flags/andorra.webp"
                                }
                              />
                            </div>
                            <p>{contactUser.username}</p>
                          </div>

                          <>
                            {targetUserContactStatus === "active" && <Success_SVG />}
                            {targetUserContactStatus === "blocked" && <Close_SVG />}
                            {targetUserContactStatus === "pending" && <Pending_SVG width={32} height={32} />}
                          </>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProfileContactsFeed;
