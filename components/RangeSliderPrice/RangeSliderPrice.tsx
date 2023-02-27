import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";

//App Theme
import { ColorPalleteOptions } from "../../theme/appThemeModel";

//UI Components
import IconFilled from "../Icons/IconFilled";
import RangeSlider from "../Range Slider";
import Typography from "../Typography";

//Hooks & Func
import { numberFormatter } from "../../utils/utils";

//RangeSliderPrice Props
interface RangeSliderPriceProps extends ColorPalleteOptions {
  step?: number;
  min?: number;
  max?: number;
  onChange?: (values: Array<number>) => void;
}

/**
 ** ============================================================================
 ** Component [RangeSliderPrice]
 ** ============================================================================
 */
const RangeSliderPrice = ({
  color,
  step,
  min,
  max,
  onChange = () => {},
}: RangeSliderPriceProps) => {
  /**
   ** **
   ** ** ** State & Vars
   ** **
   */
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(1000);

  const [width, setWidth] = useState(100);

  /**
   ** **
   ** ** ** RangeSliderPrice Styles
   ** **
   */
  const styles = StyleSheet.create({
    container: { width: "100%" },
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  });

  /**
   ** **
   ** ** ** Methods
   ** **
   */
  //on Change Handler
  const onChangeHandler = useCallback((values: Array<number>) => {
    setPriceMin(values[0]);
    setPriceMax(values[1]);

    onChange(values);
  }, []);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.row}>
        <View style={styles.row}>
          <IconFilled color="dark" name="dollar" />
          <Typography color="dark" variant="h4">
            {numberFormatter(priceMin)}
          </Typography>
        </View>
        <Typography style={{ paddingHorizontal: 8 }} variant="h1">
          -
        </Typography>
        <View style={styles.row}>
          <IconFilled color="dark" name="dollar" />
          <Typography variant="h4">{numberFormatter(priceMax)}</Typography>
        </View>
      </View>
      <RangeSlider
        color={color}
        variant="two_handles"
        onChange={onChangeHandler}
        step={step}
        min={min}
        max={max}
        width={width}
      />
    </View>
  );
};

export default RangeSliderPrice;
