import { StyleSheet, View, Image, Pressable } from "react-native";

//App Theme
import { booleanAlt, colors } from "../../theme/appThemeModel";

//UI Components
import Button from "../Buttons/Button";
import Link from "../Link";
import Pill from "../Pill";
import Typography from "../Typography";
import IconFilled from "../Icons/IconFilled";
import IconOutlined from "../Icons/IconOutlined";
import { IconsFilled } from "../Icons/IconBase";
import AppTheme from "../../theme/appTheme";
import IconButton from "../Buttons/IconButton";

//Type Delivery Status
type DeliveryStatus = "NONE" | "PENDING" | "DELIVERED" | "CANCELED";

//ProductCardHorizontal Props
interface ProductCardHorizontalProps {
  title: string;
  image: string;
  price: number;
  deletedPrice?: number;
  ratings?: number;
  categories?: Array<string>;
  isStaffPicked?: booleanAlt;
  deliveryStatus?: DeliveryStatus;
  isWishlisted?: booleanAlt;
  showAddToCartButton?: booleanAlt;
  onPressAddToWishlist?: () => void;
  onPressAddToCartHandler?: () => void;
  onPressItemHandler?: () => void;
}

/**
 ** ============================================================================
 ** Component [ProductCardHorizontal]
 ** ============================================================================
 */
const ProductCardHorizontal = ({
  title,
  image,
  price,
  deletedPrice = 0,
  ratings,
  categories = [],
  isStaffPicked = "true",
  isWishlisted = "false",
  showAddToCartButton = "false",
  deliveryStatus = "NONE",
  onPressAddToWishlist,
  onPressAddToCartHandler,
  onPressItemHandler,
}: ProductCardHorizontalProps) => {
  /**
   ** **
   ** ** ** ProductCardHorizontal Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    pressable: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    productImage: { width: 90, height: 110, overflow: "hidden" },
    productContent: {
      paddingLeft: AppTheme.spacer(1) as number,
      flex: 1,
      height: "100%",
      justifyContent: "center",
    },
    wishlistButton: {
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 10,
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
    },
    priceDeleted: {
      paddingLeft: (AppTheme.spacer(1) as number) / 2,
    },
    wrapper: {
      paddingBottom: AppTheme.spacer(1) as number,
    },
    buttonAddToCart: {
      width: 130,
    },
  });

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  const getDeliveryStatus = (deliveryStatus: DeliveryStatus) => {
    switch (deliveryStatus) {
      case "PENDING":
        return {
          text: "Almost there!",
          icon: "clock-o" as IconsFilled,
          color: "dark" as colors,
        };
      case "DELIVERED":
        return {
          text: "Delivered!",
          icon: "check-circle" as IconsFilled,
          color: "success" as colors,
        };
      case "CANCELED":
        return {
          text: "Canceled!",
          icon: "times-circle" as IconsFilled,
          color: "error" as colors,
        };
      default:
        return {
          text: "",
          icon: "home" as IconsFilled,
          color: "light" as colors,
        };
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressable}
        android_ripple={{ color: AppTheme.pallete.secondary.light }}
        onPress={onPressItemHandler}
      >
        <View style={styles.productImage}>
          <View style={styles.wishlistButton}>
            <IconButton
              color="primary"
              onPress={onPressAddToWishlist}
              size={"sm"}
              icon={
                isWishlisted === "true" || isWishlisted === true ? (
                  <IconFilled size={"sm"} color="primary" name="heart" />
                ) : (
                  <IconOutlined size={"sm"} color="primary" name="heart" />
                )
              }
            />
          </View>
          <Image
            source={{
              uri: image,
            }}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </View>
        <View style={styles.productContent}>
          <Typography style={styles.wrapper} variant="bodyMd">
            {title}
          </Typography>
          <View style={[styles.row, styles.wrapper]}>
            <View style={styles.row}>
              <View style={styles.row}>
                <IconFilled color="dark" size="sm" name="dollar" />
                <Typography variant="h5">{price.toFixed(2)}</Typography>
              </View>
              {deletedPrice > 0 ? (
                <Typography
                  style={styles.priceDeleted}
                  color="light"
                  variant="strikethroughSm"
                >
                  ${deletedPrice.toFixed(2)}
                </Typography>
              ) : (
                ""
              )}
            </View>
            {deletedPrice > 0 ? (
              <Pill
                size="sm"
                color="primary"
                text={`${Math.round(
                  ((deletedPrice - price) * 100) / deletedPrice
                )}% OFF`}
              />
            ) : (
              ""
            )}
          </View>
          <View style={[styles.row, styles.wrapper]}>
            <View style={styles.row}>
              {ratings ? (
                <>
                  <IconFilled size="sm" color="primary" name="star" />
                  <Typography variant="bodySmAlt">
                    {ratings.toFixed(1)}
                  </Typography>
                </>
              ) : (
                ""
              )}
            </View>

            {isStaffPicked === "true" || isStaffPicked === true ? (
              <Pill size="sm" color="secondary" text="STAFF PICK" />
            ) : (
              ""
            )}
          </View>

          {categories.length > 0 ? (
            <View style={[styles.row, { justifyContent: "flex-start" }]}>
              <Typography
                style={styles.wrapper}
                color="light"
                variant="bodySmAlt"
              >
                In:{" "}
              </Typography>
              <Typography style={styles.wrapper} color="dark" variant="bodySm">
                {categories.join(", ")}
                {categories.length > 1 && "."}
              </Typography>
            </View>
          ) : (
            ""
          )}

          {deliveryStatus !== "NONE" && (
            <View
              style={[
                styles.row,
                styles.wrapper,
                {
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
              ]}
            >
              <Link
                style={{ paddingRight: 8 }}
                size="sm"
                color={getDeliveryStatus(deliveryStatus).color}
                text={getDeliveryStatus(deliveryStatus).text}
              />
              <IconFilled
                size="sm"
                name={getDeliveryStatus(deliveryStatus).icon}
                color={getDeliveryStatus(deliveryStatus).color}
              />
            </View>
          )}

          {showAddToCartButton === "true" || showAddToCartButton === true ? (
            <View style={styles.buttonAddToCart}>
              <Button
                variant="solid"
                title="Add To Cart"
                size="sm"
                roundedCorners="full"
                onPress={onPressAddToCartHandler}
                iconStart={
                  <IconOutlined name="shopping-cart" size="sm" color="light" />
                }
              />
            </View>
          ) : (
            ""
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default ProductCardHorizontal;
