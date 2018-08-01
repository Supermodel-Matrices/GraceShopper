import React from 'react';
import { expect } from 'chai';
import enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../client/store';

const adapter = new Adapter()
enzyme.configure({ adapter })

//Components To Test
import { CartPage } from '../client/components/CartPage'
import { getCartItems, addItemToCart, removeItemFromCart } from '../client/store/cart';

xdescribe('Front-End', () => {

    const cart = [
        { id: 1, name: 'Candles', image: 'https://www.ikea.com/us/en/images/products/fenomen-unscented-block-candle-beige__0432192_PE586207_S4.JPG', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 30 },
        { id: 2, name: 'Big Candles', image: 'https://www.cheatsheet.com/wp-content/uploads/2017/09/melted-candle.jpg', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 60 },
        { id: 3, name: 'Small Candles', image: 'http://cdn.shopify.com/s/files/1/1559/3917/products/shutterstock_candle_med_grande.jpg?v=1477794398', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 10 },
        { id: 4, name: 'Red Candles', image: 'http://candles.org/wp-content/uploads/2016/06/red-candle.jpg', description: 'ITS A CANDLE! MARVEL AT ITS RED LIGHT!', category: 'lighting', price: 530 },
        { id: 5, name: 'White Candles', image: 'https://images.pexels.com/photos/783200/pexels-photo-783200.jpeg?auto=compress&cs=tinysrgb&h=350', description: 'ITS A CANDLE! MARVEL AT ITS WHITE LIGHT!', category: 'lighting', price: 5 },
    ];

    describe('<CartPage /> component', () => {

        let cartPage;

        beforeEach('Create component', () => {
            cartPage = shallow(<CartPage store={store} cart={cart} fetchCartItems={getCartItems}/>);
        });

        //
        // has a local state
        //

        it('has a `subtotal` field on its state', () => {
            expect(cartPage.state().subtotal).to.equal(0);
        });
        it('has a `tax` field on its state', () => {
            expect(cartPage.state().tax).to.equal(0);
        });
        it('has a `shipping` field on its state', () => {
            expect(cartPage.state().shipping).to.equal(0);
        });
        it('has a `total` field on its state', () => {
            expect(cartPage.state().total).to.equal(0);
        });
    });

});

xdescribe('Action Creators', ()=> {

    describe('getCartItems', () => {
        it('returns a proper get action', () => {
            expect(getCartItems()).to.deep.equal({
                type: 'FETCH_CART_ITEMS'
            });
        });
    });

    describe('addItemToCart', () => {
        it('returns a proper add action', () => {
            const cartItem = { id: 1, name: 'Candles', image: 'https://www.ikea.com/us/en/images/products/fenomen-unscented-block-candle-beige__0432192_PE586207_S4.JPG', description: 'ITS A CANDLE! MARVEL AT ITS LIGHT!', category: 'lighting', price: 30 };
            expect(addItemToCart(cartItem)).to.deep.equal({
                type: 'ADD_ITEM_TO_CART',
                cartItem
            });
        });
    });

    describe('removeItemFromCart', () => {
        it('returns a proper remove action', () => {
            const cartItemId = 1;
            expect(removeItemFromCart(cartItemId)).to.deep.equal({
                type: 'REMOVE_ITEM_FROM_CART',
                cartItemId
            });
        });
    });
});
