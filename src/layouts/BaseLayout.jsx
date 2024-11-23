import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import AnnouncementBar from "@components/AnnouncementBar";
import Footer from "@components/Footer";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
