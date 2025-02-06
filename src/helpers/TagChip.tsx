const TagChip = ({ title }: { title: string }) => {
  return (
    <span className="bg-blue-500 text-white px-2 py-1 font-semibold rounded-md w-max">
      {title}
    </span>
  );
};

export default TagChip;
