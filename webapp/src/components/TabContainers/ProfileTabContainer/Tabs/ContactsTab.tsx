"use client";
import { useState } from "react";
import UserSearchbar from "@/components/UserSearchbar";
import { useUserContext } from "@/contexts/userContext";
import ProfileContactsFeed from "@/components/Feeds/ProfileContactsFeed";

const ContactsTab: React.FC = () => {
  const { user } = useUserContext();
  const [activeSection, setActiveSection] = useState<"view" | "search">("view");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row gap-5 items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3>Contacts</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare
            leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat
            ornare sit amet.
          </p>
        </div>

        <div
          className="button"
          onClick={() => {
            setActiveSection((prevValue: "view" | "search") => {
              switch (prevValue) {
                case "view":
                  return "search";
                case "search":
                  return "view";
              }
            });
          }}
        >
          {activeSection === "view" ? "Search" : "View"}
        </div>
      </div>

      <div>
        {activeSection === "view" ? (
          <>
            {!user?.contacts || user?.contacts.length === 0 ? (
              <>
                <p>No Contacts yet... </p>
                <p
                  className="link-text"
                  onClick={() => {
                    setActiveSection("search");
                  }}
                >
                  Search for some.
                </p>
              </>
            ) : (
              <ProfileContactsFeed />
            )}
          </>
        ) : (
          <UserSearchbar />
        )}
      </div>
    </div>
  );
};

export default ContactsTab;
