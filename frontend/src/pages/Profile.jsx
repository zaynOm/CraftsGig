import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

import AddGigDialog from "@/components/AddGigDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import useQueryFetch from "@/hooks/useQueryFetch";

export default function Profile() {
  const { authenticated, getUserId, logout } = useAuth();
  const userId = getUserId();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) navigate("/login");
  }, []);

  const {
    data: user,
    isError,
    isFetching,
  } = useQueryFetch("user", `/users/${userId}`);

  const gigsQuery = useQueryFetch("userGigs", `/users/${userId}/gigs`);

  console.log(user);
  console.log(gigsQuery.data);

  if (isError) {
    return <div className="text-center">Something Went Wrong</div>;
  }
  return (
    <div className="mx-auto mt-5 flex h-svh w-5/12 flex-col gap-8">
      {isFetching ? (
        "Loading..."
      ) : (
        <div className="my-8 space-y-20">
          <div className="flex items-center gap-6">
            <div className="size-16 rounded-full bg-black" />
            <h2 className="text-2xl font-bold">
              {user.first_name} {user.last_name}
            </h2>
          </div>
          {user.role === "worker" && (
            <div className="flex gap-3">
              <Badge>{user.domain}</Badge>
              <Badge>{user.experience} of experience</Badge>
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <Button
              variant="destructive"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </Button>
            <Button variant="outline">Edit profile</Button>
          </div>
          <div className="flex gap-3">
            <span className="text-sm text-gray-500">{user.domain?.title}</span>
          </div>
          <div className="mt-20">
            {user.role === "worker" && !gigsQuery.data?.length ? (
              <div className="flex justify-center gap-3">
                <span>No gigs available yet. You can create one</span>
                <PlusCircle />
              </div>
            ) : (
              <UserGigs query={gigsQuery} />
            )}
          </div>
        </div>
      )}
      <div className="absolute bottom-6 right-6">
        {user.role === "worker" && <AddGigDialog />}
      </div>
    </div>
  );
}

function Badge({ children }) {
  if (!children) return;
  return <div className="rounded-md bg-slate-300 px-3 ">{children}</div>;
}

function UserGigs({ query }) {
  const { data: gigs, isError, isLoading } = query;

  if (isLoading || !gigs) return "Loading...";
  if (isError) return "Somthing went wrong";

  console.log(gigs);

  return (
    <div>
      {gigs.map((gig) => (
        <div
          key={gig.id}
          className="mb-3 h-40 w-[50rem] space-y-5 rounded-md border border-input px-8 py-4"
        >
          <h1 className="text-lg font-bold">{gig.title}</h1>
          <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
            {gig.description}
          </h1>
          <p className="text-sm text-gray-500">{gig.city.name}</p>
        </div>
      ))}
    </div>
  );
}
