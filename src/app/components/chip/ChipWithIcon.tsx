"use client";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import Chip from "./Chip";

const ChipWithIcon = ({ label = "Label", isBookmarked = false }: { label: string; isBookmarked: boolean }) => {
  const iconStyle = "text-gray-400 text-[12px] lg:text-[16px]";
  const icon = isBookmarked ? (
    <FaBookmark strokeWidth={1.5} className={iconStyle} />
  ) : (
    <FaRegBookmark strokeWidth={1.5} className={iconStyle} width={"0.5em"} />
  );
  return <Chip variant="negative" label={label} icon={icon} textStyle="text-gray-400 !important" />;
};

export default ChipWithIcon;
