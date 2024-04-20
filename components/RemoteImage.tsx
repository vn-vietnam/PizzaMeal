import { Image } from "react-native";
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type RemoteImageProps = {
	path?: string | null;
	fallback: string;
} & Omit<ComponentProps<typeof Image>, "source">;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
	const [image, setImage] = useState<string | null>(null);
  // console.log(path)
	useEffect(() => {
		if (!path) return;
		(async () => {
			setImage("");
			try {
				const { data } = await supabase.storage.from("product_image").download(path);
        // console.log(data)
				if (data) {
					const fr = new FileReader();
					fr.readAsDataURL(data);
					fr.onload = () => {
						setImage(fr.result as string);
					};
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [path]);

	if (!image) {
	}
	// console.log(image)
	return <Image source={{ uri: image || fallback }} {...imageProps} />;
};

export default RemoteImage;
