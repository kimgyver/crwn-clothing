import {createSelector} from 'reselect';

const COLLECTION_TO_MAP = {
    hats: 1,
    sneakers: 2,
    jackets: 3,
    womens: 4,
    mens: 5
};

const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectCollection = collectionParam => createSelector(
    [selectShopCollections],
    collections => collections.find(collection => collection.id == COLLECTION_TO_MAP[collectionParam])
)