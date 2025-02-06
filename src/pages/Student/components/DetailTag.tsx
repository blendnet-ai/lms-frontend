const DetailTag = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => {
  return (
    <div className="flex flex-row w-full justify-between mb-2.5">
      <p className="font-bold">{label}</p>
      <p className="text-gray-500 max-w-[70%] break-words">{value}</p>
    </div>
  );
};

export default DetailTag;
