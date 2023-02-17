import { StyleSheet, View } from "react-native";

//App Theme
import AppTheme, { getSize } from "../../theme/appTheme";
import { sizes } from "../../theme/appThemeModel";

//UI Components
import Avatar from "../Avatar";

//Invitees
interface InviteesProps {
  avatars: Array<string>;
  size?: sizes;
  onPress?: () => void;
}

/**
 ** ============================================================================
 ** Component [Invitees]
 ** ============================================================================
 */
const Invitees = ({ avatars = [], size = "md", onPress }: InviteesProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const marginLeft = -getSize(size, [4, 5, 7]) as number;

  /**
   ** **
   ** ** ** Invitees Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
    },
    wrapper: {
      padding: AppTheme.spacer(1) as number,
      backgroundColor: AppTheme.pallete.ui.white,
      borderRadius: 100,
    },
  });

  return (
    <View style={styles.container}>
      {avatars.map((avatar, i) => (
        <View
          key={i}
          style={[styles.wrapper, { marginLeft: i > 0 ? marginLeft : 0 }]}
        >
          <Avatar showRipple="false" size={size} avatar={avatar} />
        </View>
      ))}
      <View style={[styles.wrapper, { marginLeft }]}>
        <Avatar
          onPress={onPress}
          size={size}
          variant="invitees"
          isLoggedIn={false}
        />
      </View>
    </View>
  );
};

export default Invitees;
