"use client";
import { verifyToken } from "@/lib/auth";
import { useStore, token } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function TopBar() {
  const router = useRouter();
  const [token, resetToken] = useStore((state: token) => [
    state.token,
    state.resetToken,
  ]);
  useEffect(() => {
    if (!token) {
      router.push("/");
    } else {
      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        router.push("/");
      }
    }
  });
  const user = verifyToken(token);
  return (
    <div>
      <div className="w-full bg-blue-600">
        <div className="max-w-[1440px] mx-auto py-5 flex justify-end gap-10">
          <div>
            <h1 className="text-white">Welcome {user?.username}</h1>
          </div>
          <div>
            <Badge
              onClick={() => {
                resetToken();
                router.push("/");
              }}
              variant="destructive"
              className="cursor-pointer"
            >
              Logout
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
