"use client";
import { useEffect, useState } from "react";

type Props = {
  tabs: Tab[];
  initialActiveTab?: number;
};

const TabContainer: React.FC<Props> = (props: Props) => {
  const { tabs, initialActiveTab = 0 } = props;
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    if (activeTab !== null) return;

    var newActiveTab = initialActiveTab;
    if (initialActiveTab < 0) newActiveTab = 0;
    if (initialActiveTab > tabs.length) newActiveTab = tabs.length;
    setActiveTab(newActiveTab);
  }, []);

  return (
    <div className="tab-container flex flex-col">
      <div className="header w-full flex lfex-row justify-end">
        <ul className="flex overflow-hidden flex-row">
          {tabs.map((tab: Tab, key: number) => {
            return (
              <li
                key={key}
                className={`${key === activeTab ? "active" : ""} px-5 py-2 cursor-pointer font-bold`}
                onClick={() => {
                  setActiveTab(key);
                }}
              >
                <p>{tab.title}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="body scrollbar-y p-5 w-full">{activeTab === null ? <></> : <>{tabs[activeTab].content}</>}</div>
    </div>
  );
};

export default TabContainer;
