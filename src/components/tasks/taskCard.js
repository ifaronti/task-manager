export default function TaskCard({ text, subText, event }) {
  return (
    <article
      onClick={event}
      className="w-[280px] group/task shadow-lg cursor-pointer rounded-lg bg-nav py-[23px] px-[16px]"
    >
      <h2 className="text-texts group-hover/task:text-[#635FC7] text-[.9375rem] mb-[8px]">
        {text}
      </h2>
      <p className="text-xs text-[#828fa3]">{subText}</p>
    </article>
  );
}
