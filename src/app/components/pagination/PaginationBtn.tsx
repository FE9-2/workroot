import { ReactNode } from "react";

const PaginationBtn = ({ children }: { children: ReactNode }) => {
  return (
    <div className="size-34 lg:radius-lg flex items-center justify-center rounded-md lg:size-[48px]">{children}</div>
  );
};

export default PaginationBtn;
