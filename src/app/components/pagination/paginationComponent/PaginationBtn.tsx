interface PaginationBtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  extraStyle?: string;
  "aria-label"?: string;
  "aria-current"?: boolean;
}

const PaginationBtn = ({
  children,
  onClick,
  disabled,
  extraStyle,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: PaginationBtnProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm hover:bg-grayscale-100 disabled:cursor-not-allowed disabled:opacity-50 lg:h-10 lg:w-10 lg:text-base ${extraStyle}`}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </button>
  );
};

export default PaginationBtn;
