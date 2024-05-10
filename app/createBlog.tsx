import React from "react";
import {
	Text,
	Platform,
	KeyboardAvoidingView,
	SafeAreaView,
	ScrollView,
	View,
} from "react-native";
import { Button } from "react-native-elements";
import {
	actions,
	RichEditor,
	RichToolbar,
} from "react-native-pell-rich-editor";

const handleHead = ({ tintColor }: any) => (
	<Text style={{ color: tintColor }}>H1</Text>
);
const TempScreen = () => {
	const richText = React.useRef(null);
	return (
		<SafeAreaView>
			<ScrollView>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={{ flex: 1 }}
				>
					{/* <Text>Description:</Text> */}
					<RichEditor
						ref={richText}
						onChange={(descriptionText) => {
							console.log("descriptionText:", descriptionText);
						}}
					/>
				</KeyboardAvoidingView>

				<View
					style={{
						flex: 1,
						flexWrap: "wrap",
						// width: "100%",
					}}
				>
					<RichToolbar
						editor={richText}
						actions={[
							actions.blockquote,
							actions.code,
							actions.setBold,
							actions.setItalic,
							actions.insertBulletsList,
							actions.insertOrderedList,
							actions.insertLink,
							actions.setUnderline,
							actions.checkboxList,
							actions.undo,
							actions.redo,
							actions.insertLine,
							actions.alignCenter,
						]}
						iconMap={{ [actions.heading1]: handleHead }}
					/>
				</View>
				<Button title="Submit" />
			</ScrollView>
		</SafeAreaView>
	);
};

export default TempScreen;
