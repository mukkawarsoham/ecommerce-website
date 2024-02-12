const cartOrder = require('../models/cartOrders');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middlewares/catchAsyncError');


exports.addToCart = catchAsyncError(
    async (req, res, next) => {
        try {
            const { ownerID, item, ownerName } = req.body;
            const userID = req.userID;

            var cart = await cartOrder.findOne({ userID: userID, ownerID: ownerID });

            if (!cart) {

                cart = await cartOrder.create({
                    userID: userID,
                    ownerID: ownerID,
                    ownerName: ownerName,
                    orderItems: [],
                })
            }

            await cart.addItem(item);
            res.status(200).send({ success: true, message: "added Successfully", ...cart });
        }

        catch (error) {
            res.status(400).send({ message: error })
        }
    }
);

exports.removeToCart = catchAsyncError(
    async (req, res, next) => {
        const { ownerID, item } = req.body;
        const userID = req.userID;

        const cart = await cartOrder.findOne({ userID: userID, ownerID: ownerID });
        try {
            await cart.removeItem(item);
            const orderItems = cart?.orderItems;

            res.status(200).send({ success: true, message: "removed Successfully", cart: orderItems });
        }
        catch (error) {
            return next(new ErrorHandler(error, 401));
        }

    }
);


exports.getCart = async (req, res, next) => {
    const ownerID = req.params.id;
    const userID = req.userID;

    const cart = await cartOrder.find({ userID: userID, ownerID: ownerID });

    if (cart.length == 0) {
        res.status(200).send({ message: "cart not found, nothing to get from cart", items: [] });
    }
    else {
        const orderItems = cart[0]?.orderItems;
        res.status(200).send({ message: "cart found", items: orderItems });
    }
};


exports.deleteCart = catchAsyncError(async (req, res, next) => {
    const ownerID = req.params.id;
    const userID = req.userID;


    const cart = await cartOrder.findOneAndDelete({ userID: userID, ownerID: ownerID });

    res.status(202).send({ success: true, message: "cart deleted", cart: cart });
})


exports.removeFromCart = catchAsyncError(async (req, res, next) => {
    const itemID = req.query.itemID;
    const ownerID = req.query.ownerID;
    const userID = req.userID;

    var cart = await cartOrder.findOne({ userID: userID, ownerID: ownerID });
    if (cart) {
        await cart.deleteItem(itemID);
        res.status(200).send({ success: true, message: "removed from cart Successfully", ...cart });
    }
    else {
        res.status(201).send({
            success: false,
            message: "item ID not found in the request",
        })
    }

})