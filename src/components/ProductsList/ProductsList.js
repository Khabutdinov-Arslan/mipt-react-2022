import Container from 'react-bootstrap/Container';
import {useCallback, useState} from "react";

import {ProductsListItem} from 'components/Common/ProductsListItem/ProductsListItem'
import {ProductsSearch} from 'components/ProductsSearch/ProductsSearch'

import tags from "mock/tags-sample.json";
import './ProductsList.css'
import { useLoading, getProducts } from 'utils/loader';

import Container from 'react-bootstrap/Container';

export const ProductsList = ({tag}) => {
    if (tag == null) {
        tag = "";
    }
    const tagsTree = new TagsTree(tags);
    let productList = new ProductList();

    const [query, setQuery] = useState("");
    const getMatchingProducts = useCallback(
        () => getProducts(query, tag),
        [query, tag]
    )
    const productsResponse = useLoading(getMatchingProducts);

import './ProductsList.css'


export const ProductsList = ({tag}) => {
    const tagsTree = new TagsTree();
    let productList = new ProductList();

    const [query, setQuery] = useState("");

    return <Container className="products-list">
        <ProductsSearch query={query} handler={setQuery}/>
        {
            productList.get()
            .filter(product=>tagsTree.isChildTag(tag, product.tag))
            .filter(product=>(product.title.toLowerCase().includes(query.toLowerCase()) 
            || product.description.toLowerCase().includes(query.toLowerCase())))
            .map(product => 
            <Container key={product.usin}>
                <ProductsListItem product={product}/>
            </Container>
            )
        }
    </Container>
}
