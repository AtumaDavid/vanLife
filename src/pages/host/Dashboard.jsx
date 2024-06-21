import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h1>dashboard</h1>
      <Outlet />
    </>
  );
}
