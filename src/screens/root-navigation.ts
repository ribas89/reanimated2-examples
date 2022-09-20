import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';

export type NavigateProps = {
  name: string;
  params?: object;
};

export type ResetProps = {
  routes?: {name: string; params?: any}[];
  name?: string;
  index?: number;
};

export const navigationRef = createNavigationContainerRef();

export const navigate = (navigateProps: NavigateProps) => {
  navigationRef.dispatch(CommonActions.navigate(navigateProps));
};

export const reset = (props: ResetProps) => {
  const {routes, name = 'Home', index = 0} = props || {};
  navigationRef.dispatch(
    CommonActions.reset({
      index,
      routes: routes || [{name}],
    }),
  );
};

export const goBack = () => navigationRef.goBack();

export const rootNavigation = {
  navigate,
  reset,
  goBack,
  navigationRef,
};
