import Image from "next/image";
import Close_SVG from "@/SVGs/Close_SVG";
import Pending_SVG from "@/SVGs/Pending_SVG";
import Success_SVG from "@/SVGs/Success_SVG";
import Email_SVG from "../SVGs/Email_SVG";

type Props = {
  targetUser: Partial<User>;
  user: Partial<User> | null;
  sendContactInvitation?: (targetUserId?: string) => Promise<void>;
};

const ProfileContactTabCard: React.FC<Props> = (props: Props) => {
  const { user, targetUser, sendContactInvitation = () => {} } = props;

  const getIsTargetUserContactStatus = (targetUserId: string): UserContactStatus | false => {
    if (!user?.contacts) return false;
    const contact = user?.contacts.find((contact: UserContactData) => contact.userId === targetUserId);
    if (!contact) return false;
    return contact.status;
  };
  const targetUserContactStatus = getIsTargetUserContactStatus(targetUser?._id || "");

  return (
    <div className="profile-contact-tab-card card flex flex-row gap-10 items-center justify-between p-2">
      <div className="flex flex-row gap-2 items-center justify-start w-full">
        <div className="image-wrapper">
          <Image
            width={100}
            height={100}
            alt="profile image"
            src={
              targetUser.profileImageUrl?.replace("http://localhost:3022", "") || "/assets/images/flags/andorra.webp"
            }
          />
        </div>
        <p>{targetUser.username}</p>
      </div>

      {!targetUserContactStatus || targetUserContactStatus === "none" ? (
        <button
          type="button"
          onClick={async () => {
            await sendContactInvitation(targetUser._id);
          }}
        >
          <Email_SVG />
        </button>
      ) : (
        <>
          {targetUserContactStatus === "active" && <Success_SVG />}
          {targetUserContactStatus === "blocked" && <Close_SVG />}
          {targetUserContactStatus === "pending" && <Pending_SVG width={32} height={32} />}
        </>
      )}
    </div>
  );
};

export default ProfileContactTabCard;
