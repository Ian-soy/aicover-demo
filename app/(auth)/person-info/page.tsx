import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="h-screen">
        <UserProfile path="/user-profile">个人信息</UserProfile>
      </div>
    </div>
  );
}
