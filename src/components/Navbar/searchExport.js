export const searchFrame = (handleChange, value) => {
  return (
    <form>
      <input
        autoFocus
        onChange={handleChange}
        type="text"
        value={value}
        className={`w-[300px]  px-4 outline-none cursor-pointer py-2 resize-none rounded-lg h-10 hover:border-[#635fc7] border-[1px] border-[#828fa3]/25`}
      />
    </form>
  );
};

export const QueryMedia = (matchesSM, matchesMD, matchesXL) => {
  if (matchesSM) {
    return "mobile";
  }
  if (matchesMD) {
    return "tablet";
  }
  if (matchesXL) {
    return "desktop";
  }
};
