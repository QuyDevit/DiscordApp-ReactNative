import { View, Text,Button } from 'react-native'
import React from 'react'
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { TText } from '../../themed/themeComponents';
import { CustomBottomSheet } from '../../shared/Reusables';

const SearchScreen = React.memo(React.forwardRef((props:any, ref:any) => {
  return (
    <CustomBottomSheet height={'95%'} ref={ref} >
      <TText>Hello</TText>
    </CustomBottomSheet>
  );
}))

export default SearchScreen