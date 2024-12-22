import { Hourglass } from "react-loader-spinner";

export default function TheForm({
  userPass,
  handleChange,
  handleSubmit,
  text,
  loading,
  errMSG
}) {
  const glassTimer = (
    <Hourglass
      visible={true}
      height="20"
      width="20"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={["#ffffff", "#ffffff"]}
    />
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-[500px] sm:w-[99%] flex flex-col gap-4 justify-center items-center max-w-[500px] rounded-lg bg-[white] h-[470px]"
    >
      <h1 className="text-[1.4rem] text-[#635FC7]">Enter Your Details Below</h1>

      <div className="flex flex-col-reverse gap-1">
        <input
          type="text"
          value={userPass.username}
          name="username"
          id="username"
          min="6"
          onChange={(e) => handleChange(e)}
          className="peer/user px-3 py-2 w-[343px] outline-none resize-none text-[16px] invalid:border-[red] h-10 border-[1px] border-[#828fa3]/25 rounded-lg hover:border-[#635fc7]"
        />
        <label
          htmlFor="username"
          className="peer-invalid/user:text-[red] text-[black]"
        >
          Username
        </label>
      </div>

      <div className="flex flex-col-reverse gap-1">
        <input
          type="password"
          value={userPass.password}
          name="password"
          id="password"
          min="6"
          onChange={(e) => handleChange(e)}
          className="peer/pass px-3 py-2 w-[343px] outline-none resize-none text-[16px] invalid:border-[red] h-10 border-[1px] border-[#828fa3]/25 rounded-lg hover:border-[#635fc7]"
        />
        <label
          htmlFor="password"
          className="peer-invalid/pass:text-[red] text-[black]"
        >
          Password
        </label>
      </div>
      
      {userPass.showConfirm && <div className="flex flex-col-reverse gap-1">
        <input
          type="password"
          value={userPass.confirmPassword}
          name="confirmPassword"
          id="confirm"
          min="6"
          onChange={(e) => handleChange(e)}
          className="peer/confirm px-3 py-2 w-[343px] outline-none resize-none text-[16px] invalid:border-[red] h-10 border-[1px] border-[#828fa3]/25 rounded-lg hover:border-[#635fc7]"
        />
        <label
          htmlFor="confirm"
          className="peer-invalid/confirm:text-[red] text-[black]"
        >
          Confirm Password
        </label>
      </div>}

      <button
        type="submit"
        aria-label={text}
        className="h-10 text-[white] flex-shrink-0 flex-grow-0 flex items-center justify-center text-[.8125rem] hover:bg-[#a8a4ff] bg-[#635fc7] w-[343px] rounded-3xl"
      >
        {loading ? glassTimer : text}
      </button>
      <p className={`${errMSG? 'visible':'invisible'} text-[red] mb-4`}>{errMSG? errMSG:'2'}</p>
    </form>
  );
}
