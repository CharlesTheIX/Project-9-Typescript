"use client";
// import { useState, useEffect } from "react";
// import { useUserContext } from "@/contexts/userContext";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import HeroBanner, { Highlight } from "@/components/Banners/HeroBanner";
// import { useImpersonationContext } from "@/contexts/impersonationContext";
import { heroHighlights, adminHeroHighlights } from "@/data/dashboardData";

const DashboardPage: React.FC = () => {
  // const { user } = useUserContext();
  // const impersonation = useImpersonationContext();
  // const [headerHighlights, setHeaderHighlights] = useState<Highlight[]>(heroHighlights);

  // useEffect(() => {
  //   const newTargetUser = impersonation.user ? impersonation.user : user;
  //   if (newTargetUser?.role === "admin") {
  //     setHeaderHighlights([...adminHeroHighlights, ...heroHighlights]);
  //     return;
  //   }
  //   setHeaderHighlights(heroHighlights);
  // }, [user, impersonation.user]);

  return (
    <DashboardLayout>
      <section className="flex flex-col gap-10">
        <HeroBanner
          icon="dashboard"
          title="Dashboard"
          // highlights={headerHighlights}
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt auctor sem nec semper. Ut ornare leo id risus blandit, fringilla fringilla lorem sollicitudin. Donec gravida semper lectus, eu aliquet erat ornare sit amet."
        />
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;
