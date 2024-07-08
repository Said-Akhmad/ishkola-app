import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showSettingsIcon?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack = true,
  containerStyle,
  titleStyle,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, containerStyle]}>
      {showBack ? (
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            style={styles.icon}
            source={require('../assets/icons/back.png')}
          />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <Text style={[styles.title, titleStyle]}>{title}</Text>

      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 35,
    paddingHorizontal: 14,
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    color: '#3E423A',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Header;
