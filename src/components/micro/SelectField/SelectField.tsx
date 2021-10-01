import React, { useState } from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface SelectFieldProps {
   label: string;
   selectValue: any;
   items: any;
}

const SelectField: React.FC<SelectFieldProps> = ({
   label,
   selectValue,
   items,
}) => {
   return (
      <RNPickerSelect
         placeholder={{ label, value: "" }}
         value={selectValue.get()}
         onValueChange={(v) => selectValue.set(v)}
         style={pickerSelectStyles}
         items={items}
      />
   );
};

const pickerSelectStyles = StyleSheet.create({
   inputIOS: {
      color: "#000000",
   },
   inputAndroid: {
      color: "#000000",
   },
});

export default SelectField;
