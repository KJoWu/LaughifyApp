import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MotiView } from "moti";
import tw from "tailwind-react-native-classnames";
import { LinearGradient } from "expo-linear-gradient";

const laughs = [
    { id: "1", name: "Crypto Millionaire Chuckle" },
    { id: "2", name: "Venture Capitalist Giggle" },
    { id: "3", name: "Hedge Fund Belly Laugh" },
    { id: "4", name: "Tech Bro Snort" },
    { id: "5", name: "Startup Founder Cackle" },
];

const Practice = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [selectedLaugh, setSelectedLaugh] = useState<string | null>(null);
    const [review, setReview] = useState<string | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const startRecording = () => {
        if (!selectedLaugh) {
            Alert.alert("Select a Laugh Type", "Please select a laugh type before recording!");
            return;
        }
        setIsRecording(true);
        setReview(null);
        setScore(null);
        // Simulate recording
        setTimeout(() => {
            stopRecording();
        }, 3000); // Mock 3-second recording
    };

    const stopRecording = () => {
        setIsRecording(false);
        // Mock AI review and score
        setTimeout(() => {
            setReview(
                "Your Crypto Millionaire Chuckle is solid, but it needs refined pacing and a richer tone. Pause for 1 second after the initial chuckle, then deepen your tone to peak at medium volume before tapering off smoothly. Keep the laugh between 2.5 to 3 seconds for a confident yet composed delivery."
            );
            setScore(5); // Set score to 5
        }, 2000);
    };

    const renderDropdownItem = ({ item }: { item: { id: string; name: string } }) => (
        <TouchableOpacity
            style={tw`p-4 border-b border-gray-700`}
            onPress={() => {
                setSelectedLaugh(item.name);
                setIsDropdownVisible(false);
            }}
        >
            <Text style={tw`text-white text-lg`}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={tw`flex-1 bg-black px-4`}>
            <View style={tw`flex-row justify-between items-center mb-5 pt-10`}>
                <Text style={tw`text-white text-xl font-bold`}>Opulaugh AI Analyzer</Text>

                <View style={tw`flex-row items-center`}>
                    <Text style={[tw`text-4xl font-bold`, { color: "#00ff87" }]}>3,300</Text>
                    <Text style={[tw`ml-2`, { color: "#60efff" }]}>Current LMV</Text>
                </View>
            </View>

            {/* Custom Dropdown Menu for Laugh Selection */}
            <Text style={tw`text-white text-lg text-center mb-4`}>Select a Laugh To Practice</Text>
            <TouchableOpacity
                style={tw`border border-teal-500 rounded-lg bg-gray-800 p-4 flex-row justify-between items-center`}
                onPress={() => setIsDropdownVisible(true)}
            >
                <Text style={tw`text-white text-lg`}>
                    {selectedLaugh || "Choose a laugh type..."}
                </Text>
                <Ionicons name="chevron-down" size={24} color="#4ECDC4" />
            </TouchableOpacity>

            <Modal
                visible={isDropdownVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsDropdownVisible(false)}
            >
                <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-75`}>
                    <View style={tw`bg-gray-900 w-11/12 rounded-lg`}>
                        <FlatList
                            data={laughs}
                            keyExtractor={(item) => item.id}
                            renderItem={renderDropdownItem}
                        />
                    </View>
                </View>
            </Modal>

            {/* Record Button */}
            <View style={tw`relative justify-center items-center mt-6`}>
                {isRecording && (
                    <MotiView
                        from={{ opacity: 0.8, scale: 1 }}
                        animate={{ opacity: 0, scale: 3 }}
                        transition={{
                            type: "timing",
                            duration: 1500,
                            loop: true,
                        }}
                        style={tw`absolute w-32 h-32 bg-teal-400 rounded-full`}
                    />
                )}
                <TouchableOpacity
                    style={tw`w-32 h-32 bg-teal-500 rounded-full justify-center items-center`}
                    onPress={isRecording ? stopRecording : startRecording}
                    disabled={isRecording}
                >
                    <Ionicons name={isRecording ? "stop-circle" : "mic"} size={60} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={tw`text-gray-400 text-xl text-center`}>
                {isRecording
                    ? "Hold tight, Opulaugh AI is analyzing your laugh"
                    : "Tap the mic to start recording your laugh"}
            </Text>

            {/* AI Review */}
            {review && (
                <View style={tw`mt-8 px-4`}>
                    <LinearGradient
                        colors={["#00ff87", "#60efff", "#00ff87"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[
                            tw`rounded-2xl p-0.5 mb-6`,
                            {
                                shadowColor: "#00ff87",
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0.15,
                                shadowRadius: 5,
                                elevation: 3,
                            },
                        ]}
                    >
                        <View style={[tw`bg-gray-900 rounded-2xl p-6`]}>
                            <Text style={[tw`text-2xl mb-2 text-center`, { color: "#60efff" }]}>
                                Opulaugh Analysis
                            </Text>
                            <View style={tw`flex-row justify-center items-center mt-4`}>
                                <Text style={[tw`text-3xl font-bold`, { color: "orange" }]}>
                                    Score: 5
                                </Text>
                            </View>
                            <Text style={[tw`pt-5 text-xl text-white text-center`]}>{review}</Text>
                        </View>
                    </LinearGradient>
                </View>
            )}
        </View>
    );
};

export default Practice;
