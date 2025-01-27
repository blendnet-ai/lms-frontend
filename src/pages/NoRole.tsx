import { Button } from "@/components/ui/button";
import { auth } from "../configs/firebase";

interface NoRoleProps {
  userData: string;
}

function NoRole({ userData }: NoRoleProps) {
  return (
    <div className="flex flex-col w-[600px] bg-white p-12">
      <h1 className="text-black text-4xl font-semibold">Access Denied!</h1>

      <div className="mt-4 p-6 bg-red-50 rounded border-l-4 border-red-500">
        <p className="text-black text-base">
          Sorry, your email ID <strong>{userData}</strong> is not registered
          with us. Kindly fill out this{" "}
          <a
            href="https://docs.google.com/forms/d/1xP7BOFES7ZAO8gRhJaDCDFZnj09xe0x03uls3ZTnujg/edit"
            className="text-blue-600 hover:underline"
          >
            form
          </a>{" "}
          to provide additional details and wait for a response from our team.
          <br />
          <a
            href="https://docs.google.com/forms/d/1xP7BOFES7ZAO8gRhJaDCDFZnj09xe0x03uls3ZTnujg/edit"
            className="text-blue-600 hover:underline"
          >
            Google Form Link
          </a>
        </p>
      </div>

      <div className="flex justify-end mt-8">
        <Button variant="danger" onClick={() => auth.signOut()}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default NoRole;
