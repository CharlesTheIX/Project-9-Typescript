import Image from "next/image";

type Props = {
  targetUser: Partial<User>;
  user: Partial<User> | null;
  sendFriendInvitation: (targetUserId?: string) => Promise<void>;
};

const ProfileFriendTabCard: React.FC<Props> = (props: Props) => {
  const { user, targetUser, sendFriendInvitation } = props;

  const getIsTargetUserFriendStatus = (targetUserId: string): UserFriendStatus | false => {
    if (!user?.friends) return false;
    const friend = user?.friends.find((friend: UserFriendData) => friend.userId === targetUserId);
    if (!friend) return false;
    return friend.status;
  };
  const targetUserFriendStatus = getIsTargetUserFriendStatus(user?._id || "");

  return (
    <div className="profile-friend-tab-card card flex flex-row gap-2 items-center justify-between p-2">
      <div className="flex flex-row gap-2 items-center justify-start w-full">
        <div className="image-wrapper">
          <Image
            width={100}
            height={100}
            alt="profile image"
            src={targetUser.profileImageUrl || "/assets/images/flags/andorra.webp"}
          />
        </div>
        <p>{targetUser.username}</p>
      </div>

      {!targetUserFriendStatus ? (
        <button
          type="button"
          className="button"
          onClick={async () => {
            await sendFriendInvitation(targetUser._id);
          }}
        >
          Send Request
        </button>
      ) : (
        <>
          {targetUserFriendStatus === "active" && <p>active</p>}
          {targetUserFriendStatus === "blocked" && <p>blocked</p>}
          {targetUserFriendStatus === "pending" && <p>pending</p>}
        </>
      )}
    </div>
  );
};

export default ProfileFriendTabCard;
