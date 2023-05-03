import {
  createMaterialBottomTabNavigator,
  MaterialBottomTabNavigationProp,
} from "@react-navigation/material-bottom-tabs";

import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Exercise } from "@screens/Exercise";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";
import { useTheme } from "native-base";

type AppRoutes = {
  home: undefined;
  history: undefined;
  profile: undefined;
  exercise: undefined;
};

export type AppNavigatorRoutesProps =
  MaterialBottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createMaterialBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const IconSize = sizes[6];

  return (
    <Navigator
      labeled={false}
      barStyle={{
        backgroundColor: colors.gray[700],
      }}
      shifting={false}
      activeColor={colors.yellow[700]}
      inactiveColor={colors.gray[200]}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={IconSize} height={IconSize}/>
          ),
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={IconSize} height={IconSize} />
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={IconSize} height={IconSize} />
          ),
        }}
      />

      <Screen name="exercise" component={Exercise} />
    </Navigator>
  );
}
