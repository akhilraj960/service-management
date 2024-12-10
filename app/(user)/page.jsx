'use client'
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";

export default function Home() {
  const handleLogout = () => {
    localStorage.clear("userLoggedIn");
    window.location.reload();
  };
  return (
    <Wrapper>
      <Button onClick={() => handleLogout()}>Logout</Button>
    </Wrapper>
  );
}
