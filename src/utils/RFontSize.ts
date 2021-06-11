//import {Dimensions, StatusBar} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

/*const {height, width} = Dimensions.get('window');
const standardLength = width > height ? width : height;
const offset = width > height ? 0 : (StatusBar.currentHeight as number);

const deviceHeight = standardLength - offset;*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (fontSize: number, standardScreenHeight = 568) => {
  //const size = Math.round((fontSize * deviceHeight) / standardScreenHeight);
  return moderateScale(fontSize);
};
