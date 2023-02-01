import IconBase, { IconBaseProps, IconsFilled } from "./IconBase";

/**
 ** ============================================================================
 ** Component [IconFilled]
 ** ============================================================================
 */
const IconFilled = ({
  name,
  color = "primary",
  size = "md",
  style,
}: IconBaseProps<IconsFilled>) => {
  return (
    <IconBase<IconsFilled>
      name={name}
      color={color}
      size={size}
      style={style}
      variant="filled"
    />
  );
};

export default IconFilled;
