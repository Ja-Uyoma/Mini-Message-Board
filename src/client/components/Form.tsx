import React, { FormEvent } from "react";

interface FormError {
  msg: string;
}

const Form: React.FC = () => {
  const [text, setText] = React.useState<string>("");
  const [user, setUser] = React.useState<string>("");
  const [errors, setErrors] = React.useState<FormError[] | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("user", user);

    try {
      const response: Response = await fetch("/api/messages", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success: ", result);
        setText("");
        setUser("");
        setErrors(null);
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors as FormError[]);
        console.error("Error: ", errors);
      }
    } catch (err) {
      console.error("Request failed: ", err);
      setErrors([{ msg: "An unexpected error occured" }]);
    }
  };

  return (
    <form action="/api/messages" onSubmit={handleSubmit}>
      <div className="my-1">
        <label htmlFor="text" className="form-control w-full max-w-xs">
          Text
          <input
            type="text"
            name="text"
            id="text"
            className="input input-bordered w-full max-w-xs"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label htmlFor="user" className="form-control w-full max-w-xs">
          User
          <input
            type="text"
            name="user"
            id="user"
            className="input input-bordered w-full max-w-xs"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </label>
      </div>

      {errors && (
        <div className="text-red-500">
          {errors.map((error, idx) => (
            <p key={idx}>{error.msg}</p>
          ))}
        </div>
      )}

      <button type="submit" className="btn btn-info mt-1.5">
        Submit
      </button>
    </form>
  );
};

export default Form;
