import { SafeAreaView, StyleSheet, View } from "react-native";

//App Theme
import AppTheme from "../../theme/appTheme";
import { booleanAlt } from "../../theme/appThemeModel";

//UI Components
import Typography from "../../components/Typography";
import Avatar from "../../components/Avatar";

//Header Props
interface HeaderProps {
  title: string;
  subtitle?: string;
  avatar?: string;
  isLoggedIn?: booleanAlt;
  onPressAvatar?: () => void;
}

/**
 ** ============================================================================
 ** Component [Header]
 ** ============================================================================
 */
const Header = ({
  title,
  subtitle,
  avatar,
  isLoggedIn = "true",
  onPressAvatar,
}: HeaderProps) => {
  /**
   ** **
   ** ** ** Header Styles
   ** **
   */
  const styles = StyleSheet.create({
    header: {
      backgroundColor: AppTheme.pallete.primary.main,
      height: 300,
      padding: 24,
    },
    safeView: {
      marginTop: AppTheme.spacer(3) as number,
      display: "flex",
      flexDirection: "row",
    },
    left: { flex: 1, paddingRight: AppTheme.spacer(1) as number },
    right: {
      flexGrow: 0,
    },
    subtitle: {
      paddingTop: 16,
    },
  });

  return (
    <View style={styles.header}>
      <SafeAreaView style={styles.safeView}>
        <View style={styles.left}>
          <Typography variant="h1">{title}</Typography>
          {subtitle ? (
            <Typography style={styles.subtitle} variant="bodyMd">
              {subtitle}
            </Typography>
          ) : (
            ""
          )}
        </View>
        <View style={styles.right}>
          <Avatar
            isLoggedIn={isLoggedIn}
            size="sm"
            avatar={avatar}
            onPress={onPressAvatar}
          />
          {isLoggedIn === "false" || isLoggedIn === false ? (
            <Typography variant="bodySmAlt">Log In</Typography>
          ) : (
            ""
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Header;
