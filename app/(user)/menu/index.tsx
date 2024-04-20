import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import products from "@/constants/data/products";

import { supabase } from "@/lib/supabase";
import { useProductList } from "@/api/product";
import Loading from "@/components/Container/Loading";
import ProductListItem from "@/components/ProductListItem";


const MenuScreen = () => {
	const { data: products, error, isLoading } = useProductList();
	if (isLoading) {
		return <Loading />;
	}
	setTimeout(() => {
		return <Loading />;
	}, 2000);
	if (error) {
		return <Text>Failed to fetch products</Text>;
	}
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
