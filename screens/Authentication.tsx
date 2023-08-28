import React, { FC } from "react";
import { Text, View, TouchableOpacity, Linking, Platform } from "react-native";
import { AuthenticationProps } from "./Authentication.props";
import * as LocalAuthentication from "expo-local-authentication";
import { styles } from "./Authentication.styles";

export const Authentication: FC<AuthenticationProps> = ({ navigation }) => {

  const checkSecurityLevel = async () => {
    const SecurityLevel = await LocalAuthentication.getEnrolledLevelAsync();

    // When no enrolled authentication in deveice, link to settings
    if (SecurityLevel === 0) {
      handleSetPasscode();
    } else {
      // When enrolled non-biometric authentication or biometric authentication
      // move to authentication
      handleAuthentication();
    };
  };

  const handleSetPasscode = async () => {

    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

    // When a face or fingerprint scanner is available on the device, link to setting face or fingerprint.
    if (isBiometricAvailable) {
      // We can"t provision (can't enable passcode lock) in xcode IOS Simulator.
      // I tested using physical devices.
      Platform.OS === "ios"
        ? Linking.openURL("App-Prefs:TOUCHID_PASSCODE")
        : Linking.sendIntent("android.settings.BIOMETRIC_ENROLL");
    } else {
      // When a face or fingerprint scanner is not available on the device, link to setting page
      Platform.OS === "ios"
        ? Linking.openURL("App-Prefs:")
        : Linking.sendIntent("android.settings.SECURITY_SETTINGS");
    };
  };

  const handleAuthentication = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Please authenticate",
      cancelLabel: "CANCEL",
      fallbackLabel: "Wrong passcode"
    });
    if (result.success) {
      navigation.navigate("Home");
    } else {
      LocalAuthentication.cancelAuthenticate();
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.settingsTitle}>Set Authentication to Proceed</Text>
      <TouchableOpacity testID="settingsButton" style={styles.settingsButton} onPress={() => checkSecurityLevel()} >
        <Text style={styles.settingsButtonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  );
};
