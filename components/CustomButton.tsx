interface CustomButtonProps {
  cta: string;
  bg?: string;
  color?: string;
  size?: number;
  px?: number;
  py?: number;
  fullWidthOnMobile?: boolean;
}

const CustomButton = ({
  cta,
  bg,
  color = "#000",
  size = 24,
  px = 60,
  py = 10,
  fullWidthOnMobile = false
}: CustomButtonProps) => {
  return (
    <button
      className={`font-clash tracking-wide flex justify-center items-center rounded-[10px] cursor-pointer hover:opacity-90 transition-opacity ${fullWidthOnMobile ? 'w-full sm:w-auto' : ''}`}
      style={{
        backgroundColor: bg ?? "none",
        color: color,
        fontSize: `${size}px`,
        paddingBlock: `${py}px`,
        paddingInline: `${px}px`,
      }}
    >
      {cta}
    </button>
  )
}

export default CustomButton
