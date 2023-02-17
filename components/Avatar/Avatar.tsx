import { StyleSheet, View, Image, Pressable } from "react-native";

//App theme
import AppTheme, { getSize } from "../../theme/appTheme";
import { booleanAlt, sizes } from "../../theme/appThemeModel";

//UI Components
import IconFilled from "../Icons/IconFilled";

//Avatar Props
interface AvatarProps {
  avatar?: string;
  variant?: "avatar" | "invitees";
  size?: sizes;
  isLoggedIn?: booleanAlt;
  showRipple?: booleanAlt;
  onPress?: () => void;
}

/**
 ** ============================================================================
 ** Component [Avatar]
 ** ============================================================================
 */
const Avatar = ({
  avatar,
  size = "md",
  variant = "avatar",
  isLoggedIn = "true",
  showRipple = "true",
  onPress,
}: AvatarProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const selectedSize = getSize(size, [5, 7, 10]);

  /**
   ** **
   ** ** ** Avatar Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: selectedSize,
      height: selectedSize,
      borderRadius: 100,
      backgroundColor:
        isLoggedIn === "true" || isLoggedIn === true
          ? AppTheme.pallete.ui.gray.light
          : AppTheme.pallete.ui.gray.dark,
      overflow: "hidden",
    },
    pressable: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    image: { width: "100%", height: "100%", resizeMode: "cover" },
  });

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          {
            opacity:
              pressed && (showRipple === "true" || showRipple === true)
                ? 0.6
                : 1,
          },
          styles.pressable,
        ]}
        android_ripple={{
          color:
            showRipple === "true" || showRipple === true
              ? AppTheme.pallete.ui.white
              : undefined,
        }}
        onPress={onPress}
      >
        {isLoggedIn === "true" || isLoggedIn === true ? (
          <Image
            style={styles.image}
            source={{
              uri: avatar,
            }}
          />
        ) : (
          <IconFilled
            size={size}
            name={variant === "avatar" ? "user" : "plus"}
            color="light"
          />
        )}
      </Pressable>
    </View>
  );
};

export default Avatar;
