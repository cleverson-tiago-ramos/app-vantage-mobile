import Constants from "expo-constants";

export const ENV = {
  API_URL:
    Constants.expoConfig?.extra?.API_URL ??
    Constants.manifest?.extra?.API_URL ??
    "",
};
