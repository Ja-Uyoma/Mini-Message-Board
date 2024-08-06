import { z } from "zod";

const MessageSchema = z.object({
  text: z.string(),
  user: z.string(),
  added: z.string().date(),
});

type Message = z.infer<typeof MessageSchema>;

function Message({ text, user, added }: Message) {
  return (
    <div className="bg-gray-100 rounded my-5 p-3">
      <p className="text-lg">{text}</p>
      <div className="flex justify-between mt-3">
        <p className="text-sm">
          From: <span className="font-medium">{user}</span>
        </p>
        <p className="text-sm">{added}</p>
      </div>
    </div>
  );
}

export default Message;
