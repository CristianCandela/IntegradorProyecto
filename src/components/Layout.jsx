import Sidebar from "./Sidebar";

export default function Layout({ children, role }) {
  return (
    <>
      <Sidebar role={role} />

      <main
        style={{
          marginLeft: "80px",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </main>
    </>
  );
}