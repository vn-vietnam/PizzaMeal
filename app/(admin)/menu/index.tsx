import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";


import { useProductList } from "@/api/product";
import Loading from "@/components/Container/Loading";
import ProductListItem from "@/components/ProductListItem";

const MenuScreen = () => {
	const { data: products, error, isLoading } = useProductList();

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <Text>Failed to fetch products</Text>;
	}
	// console.log(products)
	return (
		<FlatList
			data={products}
			renderItem={({ item }) => <ProductListItem product={item} />}
			numColumns={2}
			contentContainerStyle={{ gap: 10, padding: 10 }}
			columnWrapperStyle={{ gap: 10 }}
		/>
	);
};

export default MenuScreen;
