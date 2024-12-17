import { MdOutlineImage } from "react-icons/md";

const EmptyImage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-grayscale-100">
      <MdOutlineImage className="size-20 text-grayscale-400" />
    </div>
  );
};
export default EmptyImage;
