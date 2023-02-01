import IconBase, { IconBaseProps, Icons } from "./IconBase";

/**
 ** ============================================================================
 ** Component [IconOutlined]
 ** ============================================================================
 */
const IconOutlined = ({
  name,
  color = "primary",
  size = "md",
  style,
}: IconBaseProps<Icons>) => {
  return (
    <IconBase<Icons>
      name={name}
      color={color}
      size={size}
      style={style}
      variant="outlined"
    />
  );
};

export default IconOutlined;
