import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { useNavigation } from '@react-navigation/native';
import { darkColors } from '../theme/darkTheme';

const AuthScreen = () => {
    const [isLogin, setIsLogin] = useState(true);
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation();
    
    // If user is already logged in, redirect to home
    useEffect(() => {
        if (user) {
            navigation.navigate('Home');
        }
    }, [user, navigation]);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: darkColors.background }]}>
            <View style={[styles.formContainer, { backgroundColor: darkColors.background }]}>
                {isLogin ? <LoginForm /> : <SignupForm />}
                
                <TouchableOpacity
                    style={styles.switchButton}
                    onPress={() => setIsLogin(!isLogin)}
                >
                    <Text style={[styles.switchText, { color: darkColors.primary }]}>
                        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    switchButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    switchText: {
        fontSize: 16,
    },
});

export default AuthScreen;