"use client";
import { useState, useMemo } from "react";
import { debounce } from "@/lib/debounce";
import TextInput from "./Inputs/TextInput";
import getAllUsers from "@/lib/users/getAllUsers";
import LoadingContainer from "./LoadingContainer";
import { useUserContext } from "@/contexts/userContext";
import { useToastContext } from "@/contexts/toastContext";
import ProfileContactTabCard from "./Cards/ProfileContactTabCard";
import sendContactInvitation, { InvitationData } from "@/lib/notifications/sendContactInvitation";

type Props = {
  limit?: number;
  debounceTimeout?: number;
  profilePrivacy?: UserPrivacyType;
};

const UserSearchbar: React.FC<Props> = (props: Props) => {
  const { profilePrivacy = "private", limit = 10, debounceTimeout = 1000 } = props;
  const toast = useToastContext();
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [displayedUsers, setDisplayedUsers] = useState<Partial<User>[]>([]);

  const searchUsersByProfileType = async (value: string): Promise<void> => {
    setIsLoading(true);
    try {
      if (value === "") throw new Error();

      const response = await getAllUsers({
        limit,
        sort: ["username"],
        searchValue: value,
        search: ["username"],
        and: "profilePrivacy",
        andValue: profilePrivacy,
        project: ["username", "profileImageUrl"],
      });
      if (response.error || !response.data) throw new Error(response.message);
      setIsLoading(false);
      // setDisplayedUsers(response.data.filter((item: Partial<User>) => item._id !== user?._id));
      setDisplayedUsers(response.data);
      return response.data;
    } catch (error: any) {
      setIsLoading(false);
      setDisplayedUsers([]);
    }
  };

  const sendInvitation = async (targetUserId?: string): Promise<void> => {
    if (!user || !targetUserId) return;
    setIsLoading(true);

    try {
      const invitationData: InvitationData = {
        toId: targetUserId,
        type: "invitation",
        fromId: user._id || "",
        subject: `New Invitation from ${user.username}`,
        messages: [
          {
            state: "active",
            to: targetUserId,
            from: user._id || "",
            createdAt: new Date(),
            content: `You have be invited to become contacts with ${user.username}.`,
          },
        ],
      };
      const invitationResponse = await sendContactInvitation(invitationData);
      if (invitationResponse.error) throw new Error(invitationResponse.message);

      await searchUsersByProfileType("");

      setIsLoading(false);
      toast.setContent("");
      toast.setHidden(false);
      toast.setType("success");
      toast.setTitle("Invitation sent.");
    } catch (error: any) {
      setIsLoading(false);
      toast.setHidden(false);
      toast.setType("error");
      toast.setContent(error.message);
      toast.setTitle("Failed to send invitation.");
    }
  };

  const debouncedLogSearch = useMemo(
    () => debounce(searchUsersByProfileType, debounceTimeout),
    [searchUsersByProfileType],
  );

  return (
    <div
      className={`search-bar font-bold ${searchValue ? "focused" : ""} flex flex-col items-center justify-start gap-5`}
    >
      <TextInput
        label="Search"
        name="search-input"
        className="border-[0px] p-0"
        defaultValue={searchValue}
        onInput={(inputElement: any) => {
          const value = inputElement.value;
          setSearchValue(value);

          if (!value) {
            setDisplayedUsers([]);
            return;
          }

          setIsLoading(true);
          debouncedLogSearch(value);
        }}
      />

      <div
        className={`${displayedUsers.length > 0 ? "active" : ""} ${isLoading ? "loading" : ""} flex flex-col w-full`}
      >
        {isLoading ? (
          <div>
            <LoadingContainer />
          </div>
        ) : (
          <>
            {displayedUsers.length === 0 ? (
              <>{searchValue ? <p>No results found.</p> : <p>Start your search in the input above.</p>}</>
            ) : (
              <ul className="flex flex-row gap-5 flex-wrap">
                {displayedUsers.map((displayedUser: Partial<User>, key: number) => {
                  return (
                    <li key={key}>
                      <ProfileContactTabCard
                        user={user}
                        targetUser={displayedUser}
                        sendContactInvitation={sendInvitation}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserSearchbar;
