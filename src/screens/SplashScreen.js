import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const SplashScreen = () => {
    const navigation = useNavigation();
    const pencilAnimation = useRef(new Animated.Value(0)).current;
    const textAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomeScreen');
        }, 6000);

        startAnimations();
    }, []);

    const startAnimations = () => {
        Animated.parallel([
            Animated.timing(pencilAnimation, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
            Animated.timing(textAnimation, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const pencilOpacity = pencilAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const pencilTransform = pencilAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 0],
    });

    const textOpacity = textAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const textTransform = textAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
    });

    return (
        <LinearGradient
            colors={['#ac7d88', '#85586f', '#643843']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={styles.content}>
                <Animated.View
                    style={[
                        styles.pencil,
                        { opacity: pencilOpacity, transform: [{ translateY: pencilTransform }] },
                    ]}
                >
                    <Icon name="pencil-square-o" size={64} color="white" />
                </Animated.View>
            </View>
            <Animated.View style={[styles.textContainer, { opacity: textOpacity, transform: [{ translateY: textTransform }] }]}>
                <Text style={styles.appName}>N</Text>
                <Text style={styles.appName}>o</Text>
                <Text style={styles.appName}>t</Text>
                <Text style={styles.appName}>e</Text>
                <Text style={styles.space}> </Text>
                <Text style={styles.appName}>W</Text>
                <Text style={styles.appName}>i</Text>
                <Text style={styles.appName}>s</Text>
                <Text style={styles.appName}>e</Text>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 10,
    },
    space: {
        fontSize: 32,
        marginTop: 20,
    },
    pencil: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: -50,
    },
});

export default SplashScreen;
