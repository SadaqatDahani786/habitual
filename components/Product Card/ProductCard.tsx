import { Image, Pressable, StyleSheet, View } from "react-native";

//App Theme
import AppTheme from "../../theme/appTheme";
import { booleanAlt } from "../../theme/appThemeModel";

//UI Components
import Typography from "../Typography";
import Pill from "../Pill";
import IconButton from "../Buttons/IconButton";
import IconFilled from "../Icons/IconFilled";
import IconOutlined from "../Icons/IconOutlined";

//Interface Props
interface ProductCardProps {
  title: string;
  description?: string;
  image: string;
  price: number;
  deletedPrice?: number;
  ratings: number;
  numOfReviews?: number;
  categories?: Array<string>;
  isStaffPicked?: booleanAlt;
  variant?: "reg" | "mini";
  isWishlisted?: booleanAlt;
  onPressAddToWishlist?: () => void;
  onPressItemHandler?: () => void;
}

/**
 ** ============================================================================
 ** Component [ProductCard]
 ** ============================================================================
 */
const ProductCard = ({
  title,
  description,
  image,
  price = 0,
  deletedPrice = 0,
  ratings,
  numOfReviews,
  categories = [],
  isStaffPicked = "false",
  variant = "reg",
  isWishlisted = "false",
  onPressAddToWishlist,
  onPressItemHandler,
}: ProductCardProps) => {
  /**
   ** **
   ** ** ** Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: variant === "reg" ? 280 : 180,
      backgroundColor: AppTheme.pallete.ui.white,
      borderRadius: 8,
      overflow: "hidden",
      elevation: 1,
      position: "relative",
    },
    imageWrapper: {
      width: "100%",
      height: variant === "reg" ? 160 : 120,
      overflow: "hidden",
      backgroundColor: "blue",
      display: "flex",
      justifyContent: "flex-start",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: variant === "reg" ? "baseline" : "center",
    },
    mainContent: {
      padding: AppTheme.spacer(2) as number,
    },
    body: {
      paddingVertical:
        variant === "reg"
          ? (AppTheme.spacer(2) as number)
          : (AppTheme.spacer(1) as number),
    },
    footer: {
      height: variant === "reg" ? 56 : 26,
      display: "flex",
      justifyContent: "space-between",
    },
    cats: {
      paddingTop: 8,
    },
    wishlistButton: {
      position: "absolute",
      top: AppTheme.spacer(1) as number,
      right: AppTheme.spacer(1) as number,
      zIndex: 10,
    },
    title: {
      paddingBottom: AppTheme.spacer(1) as number,
    },
    priceDeleted: {
      paddingLeft: AppTheme.spacer(1) as number,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{ color: AppTheme.pallete.secondary.light }}
        onPress={onPressItemHandler}
      >
        <View style={styles.wishlistButton}>
          <IconButton
            color="primary"
            onPress={onPressAddToWishlist}
            size={variant === "reg" ? "md" : "sm"}
            icon={
              isWishlisted === "true" || isWishlisted === true ? (
                <IconFilled
                  size={variant === "reg" ? "md" : "sm"}
                  color="primary"
                  name="heart"
                />
              ) : (
                <IconOutlined
                  size={variant === "reg" ? "md" : "sm"}
                  color="primary"
                  name="heart"
                />
              )
            }
          />
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: image,
            }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </View>
        <View style={styles.mainContent}>
          <Typography
            style={styles.title}
            variant={variant === "reg" ? "bodyLg" : "bodyMd"}
          >
            {title}
          </Typography>
          <View style={styles.row}>
            <View style={styles.row}>
              <View style={styles.row}>
                <IconFilled color="dark" size="sm" name="dollar" />
                <Typography variant="h5">{price.toFixed(2)}</Typography>
              </View>

              {deletedPrice > 0 && (
                <Typography
                  style={styles.priceDeleted}
                  color="light"
                  variant="strikethroughSm"
                >
                  ${deletedPrice.toFixed(2)}
                </Typography>
              )}
            </View>
            {variant === "reg" && deletedPrice > 0 ? (
              <Pill
                color="primary"
                text={`${Math.round(
                  ((deletedPrice - price) * 100) / deletedPrice
                )}% OFF`}
              />
            ) : (
              ""
            )}
          </View>
          <View style={styles.body}>
            {variant === "reg" && (
              <Typography variant="bodySm">{description}</Typography>
            )}
          </View>
          <View style={styles.footer}>
            <View style={styles.row}>
              <View style={styles.row}>
                <IconFilled color="primary" name="star" />
                <Typography variant="bodySmAlt">
                  {ratings.toFixed(1)}{" "}
                  {variant === "reg" && `(${numOfReviews})`}
                </Typography>
              </View>
              {isStaffPicked === "true" || isStaffPicked === true ? (
                <Pill color="secondary" text="STAFF PICK" />
              ) : (
                ""
              )}
            </View>
            {variant === "reg" && (
              <Typography style={styles.cats} variant="bodySm">
                Categories: {categories.join(", ")}.
              </Typography>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ProductCard;
