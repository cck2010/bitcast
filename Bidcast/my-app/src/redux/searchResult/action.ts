import { RootState, RootThunkDispatch } from "../../store";

export interface SearchProduct {
    id: number;
    product_name: string;
    buy_price: number;
    product_image: string;
    description: string;
    username: string;
    min_price: number;
    starting_time: Date;
    buyer_link: string;
}

export interface CategoriesFilter {
    id: number;
    product_name: string;
    buy_price: number;
    product_image: string;
    description: string;
    username: string;
    buyer_link: string;
    min_price: number;
    category: string;
    starting_time: Date;
}

export interface ProductFilter {
    id: number;
    product_name: string;
    buy_price: number;
    product_image: string;
    description: string;
    username: string;
    min_price: number;
    starting_time: Date;
    buyer_link: string;
}

//load product search result
export function loadProductSearchResult(productList: SearchProduct[]) {
    return {
        type: "@@products/LOAD_PRODUCT_SEARCH_RESULT" as const,
        productList,
    }
}

export function loadProductCategories(categories: CategoriesFilter[]) {
    return {
        type: "@@products/LOAD_PRODUCT_CATEGORIES" as const,
        categories,
    }
}

export function loadProductForFilter(productFilter: ProductFilter[]) {
    return {
        type: "@@products/LOAD_PRODUCT_FOR_FILTER" as const,
        productFilter,
    }
}

export type SearchProductsActions = ReturnType<typeof loadProductSearchResult>
    | ReturnType<typeof loadProductCategories>
    | ReturnType<typeof loadProductForFilter>

export function fetchProductSearchResult(searchKeywords: string) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
            const res = await fetch(`
            ${process.env.REACT_APP_BACKEND_URL}/product/search
            `, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ searchKeywords })
            })

            const json = await res.json();

            dispatch(loadProductSearchResult(json.data.results.rows))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchFilteredCategories(categoryId: number) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
            const res = await fetch(`
            ${process.env.REACT_APP_BACKEND_URL}/product/categories
            `, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ categoryId })
            })
            const json = await res.json();
            dispatch(loadProductCategories(json.data.results.rows))
        } catch (error) {
            console.log(error);
        }
    }
}

export function fetchProductsForFilter(orderCommand: string) {
    return async (dispatch: RootThunkDispatch, getState: () => RootState) => {
        try {
            const res = await fetch(`
            ${process.env.REACT_APP_BACKEND_URL}/product/categories/filter
            `, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ orderCommand })
            })
            const json = await res.json()

            console.log(json);


            // if (json) {
            dispatch(loadProductForFilter(json.data.results.rows))
            // } else {
            //     dispatch(loadProductForFilter([]))
            // }
        } catch (error) {
            console.log(error);
        }
    }
}