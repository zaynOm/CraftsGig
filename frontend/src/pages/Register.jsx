import { useState } from "react";

function Register() {
  const [isCraftsMan, setIsCraftsMan] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex h-dvh flex-col items-center">
      <form
        onSubmit={handleSignUp}
        className="m-20 flex min-h-[40rem] w-[40%] flex-col gap-6 border-2 p-20"
      >
        <h1>Sign up</h1>
        <div className="flex w-auto flex-wrap gap-6">
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="my-input max-w-full flex-1"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="my-input max-w-full flex-1"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="my-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="my-input"
        />
        <input
          type="password"
          name="verify_password"
          placeholder="Verify Password"
          className="my-input"
        />
        <input type="date" name="birth_date" className="my-input" />
        {isCraftsMan && (
          <input type="tel" placeholder="Phone" className="my-input" />
        )}
        {isCraftsMan && (
          <input
            type="number"
            placeholder="Years Of Experience"
            className="my-input"
          />
        )}
        <div>
          <label>
            <input
              type="checkbox"
              name="isCraftsMan"
              value={isCraftsMan}
              onChange={() => setIsCraftsMan(!isCraftsMan)}
              className="mr-2"
            />
            I'm a CraftsMan
          </label>
        </div>
        <button className="my-input">Sign Up</button>
      </form>
    </div>
  );
}

export default Register;
