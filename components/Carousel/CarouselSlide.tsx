import { StyleSheet, View, useWindowDimensions } from "react-native";

//App Theme
import AppTheme from "../../theme/appTheme";

//UI Components
import Typography from "../Typography";

//Carousel Slide I
export interface CarouselSlideI {
  id: number;
  title: string;
  subtitle: string;
  image?: React.ReactNode;
}

//Carousel Slide Props
interface CarouselSlideProps {
  slide: CarouselSlideI;
}

/**
 ** ============================================================================
 ** Component [CarouselSlide]
 ** ============================================================================
 */
const CarouselSlide = ({ slide }: CarouselSlideProps) => {
  /**
   ** **
   ** ** ** Hooks
   ** **
   */
  const { width } = useWindowDimensions();

  /**
   ** **
   ** ** ** CarouselSlide Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: {
      width: width,
      paddingHorizontal: AppTheme.spacer(3) as number,
    },
    image: {
      width: "100%",
      marginTop: "40%",
    },
    textContent: {
      display: "flex",
      alignItems: "center",
      marginTop: AppTheme.spacer(3) as number,
    },
    textSubtitle: {
      marginTop: AppTheme.spacer(2) as number,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.image}>{slide?.image}</View>
      <View style={styles.textContent}>
        <Typography variant="h1" textAlignment="center">
          {slide.title}
        </Typography>
        <View style={styles.textSubtitle}>
          <Typography variant="bodyLg" textAlignment="center">
            {slide.subtitle}
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default CarouselSlide;
