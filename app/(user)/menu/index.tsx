import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useFilterProductList, useProductList } from "@/api/product";
import Loading from "@/components/Container/Loading";
import ProductListItem from "@/components/ProductListItem";
import CategoriesList from "@/components/CategoriesList";
import { useCategoryList } from "@/api/category";

const MenuScreen = () => {
	const [cate, setCate] = useState<any>("");
	const { data: categories } = useCategoryList();
	const { data: products, error, isLoading }: any = useFilterProductList(cate);
	// console.log(products, cate);

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
		<View>
			<CategoriesList categories={categories} cate={cate} setCate={setCate} />
			<FlatList
				data={products}
				renderItem={({ item }) => <ProductListItem product={item} />}
				numColumns={2}
				contentContainerStyle={{ gap: 10, padding: 10, paddingBottom: 150 }}
				columnWrapperStyle={{ gap: 10 }}
			/>
		</View>
	);
};

export default MenuScreen;
