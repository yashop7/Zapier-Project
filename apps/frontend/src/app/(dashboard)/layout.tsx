import { SidebarDemo } from "@/components/SideBar/Working-AcertainitySideBar";
import { JSX } from "react";


//Use font-display for displaying special font
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
 
  return (
    <div className="h-screen w-full " >
      <SidebarDemo children={children}/>
      
    </div>
  );
}
