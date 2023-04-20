const Tags = ({ tagList }: { tagList: string[] }) => {
  return (
    <div>
      {tagList?.map((tag) => (
        <span
          key={tag}
          className="py-1 px-2 mr-1 rounded-xl bg-blue-100 text-blue-400 text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};
export default Tags;
