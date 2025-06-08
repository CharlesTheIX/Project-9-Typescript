"use client";
import { debounce } from "@/lib/debounce";
import TextInput from "./Inputs/TextInput";
import getAllUsers from "@/lib/users/getAllUsers";
import LoadingContainer from "./LoadingContainer";
import { useState, useMemo, Fragment } from "react";
import { useUserContext } from "@/contexts/userContext";
import ProfileFriendTabCard from "./Cards/ProfileFriendTabCard";
import { useToastContext } from "@/contexts/toastContext";
import { defaultInternalHeader } from "@/globals";
import sendFriendInvitation, { InvitationData } from "@/lib/notifications/sendFriendInvitation";

type Props = {
  limit?: number;
  debounceTimeout?: number;
  profileType?: UserProfileType;
};

const UserSearchbar: React.FC<Props> = (props: Props) => {
  const { profileType = "private", limit = 10, debounceTimeout = 1000 } = props;
  const toast = useToastContext();
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [displayedUsers, setDisplayedUsers] = useState<Partial<User>[]>([]);

  const searchUsersByProfileType = async (value: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await getAllUsers({
        limit,
        sort: ["username"],
        and: "profileType",
        searchValue: value,
        search: ["username"],
        andValue: profileType,
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
            content: `You have be invited to become friends with ${user.username}.`,
          },
        ],
      };
      const invitationResponse = await sendFriendInvitation(invitationData);
      if (invitationResponse.error) throw new Error(invitationResponse.message);

      await searchUsersByProfileType(searchValue);
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
              <ul>
                {displayedUsers.map((displayedUser: Partial<User>, key: number) => {
                  // if (displayedUser._id === user?._id) return <Fragment key={key}></Fragment>;
                  return (
                    <li key={key}>
                      <ProfileFriendTabCard
                        user={user}
                        targetUser={displayedUser}
                        sendFriendInvitation={sendInvitation}
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
