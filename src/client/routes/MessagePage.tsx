import { Params, useLoaderData, useParams, Link } from "react-router-dom";
import Message, { MessageObject } from "../components/Message";

export async function loader({ params }: { params: Params }) {
  const response = await fetch(`/api/messages/${params.messageID}`, {
    method: "GET",
  });

  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function MessagePage() {
  const { id } = useParams<{ id: string }>();
  const { text, user, added } = useLoaderData() as MessageObject;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="my-3">
        <h1 className="text-2xl text-center">Message Details</h1>
      </header>
      <main className="w-2/4 my-0 mx-auto">
        <Message text={text} user={user} added={added} />
        <Link to={`/`} className="btn btn-secondary mt-4">
          Back to Messages
        </Link>
      </main>
      <footer className="footer footer-center bg-base-300 text-base-content p-4 mt-auto">
        <aside>
          <p>
            Copyright &copy; 2023 Mini Message Board. Created By Jimmy Givans
          </p>
        </aside>
      </footer>
    </div>
  );
}
