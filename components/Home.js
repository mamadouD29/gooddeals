import React,{View, FlatList, Text, ActivityIndicator, TouchableOpacity} from "react-native";
// import {useFetcher} from "../hooks/useFetch";
import PropTypes from "prop-types";
import {DealCard} from "../shared/Cards";
import { globalStyles } from "../styles/global";
import { useEffect, useState } from "react";
import  SearchBar from "../shared/SearchBar";



export default function Home ({navigation}) {


    const [deals, setDeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        fetchDeals();
    },[]);

    function fetchDeals(){
        fetch("https://bakesaleforgood.com/api/deals")
        .then(res =>{
            if (!res.ok){
                throw Error("Fail to download json !!!");
            }
            return res.json();
        })
        .then (data => {
            setIsError(null);
            return setDeals(data);
        })
        .catch(err => {
            setDeals(err);
            setIsError(null);
        }).finally(()=>setIsLoading(false));

        
    }

    const handleSearch=(term)=> {
        setSearchTerm(term);
    };

    // filter the term
    const termResult = deals.filter((deal)=> deal.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <View style={globalStyles.container}>
            <SearchBar onChangeText={handleSearch} />
            {
                isError ? <Text>{isError}</Text>
                : isLoading ? <ActivityIndicator size={"large"}/>
                : <FlatList 
                  data={termResult} 
                onRefresh = {fetchDeals}
                refreshing = {isLoading}
                  renderItem = {({item})=> {
                  return (
                        <TouchableOpacity onPress={()=>navigation.navigate("DealDetails", item)}>
                            <DealCard item={item} />
                        </TouchableOpacity>
                        );
                }}

                 />
            }

        </View>
    );

}


Home.propTypes = {
    navigation:  PropTypes.object.isRequired,
    SearchDeals: PropTypes.func,
};

