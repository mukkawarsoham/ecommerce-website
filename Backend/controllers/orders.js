const Orders = require('../models/orders')

exports.addOrder = async (req, res) => {
    const { userId, ownerId, cartItems, ownerName, userName, amount } = req.body;
    const orderAcceptOrDecline = "NULL";
    const orderStatus = "Pending";
    const order = await Orders.create({
        userId,
        ownerId,
        ownerName,
        userName,
        cartItems,
        orderAcceptOrDecline,
        orderStatus,
        amount
    });

    if (order) {
        return res.status(201).json({
            msg: "Order Placed Successfully",
            order: {
                _id: order._id,
            },
        });
    }
    else {
        return res.status(400).json({ msg: "Unable to Accept Order" });
    }
}

exports.acceptOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Orders.findOne({ _id: orderId });
        if (!order) {
            return res.status(400).json({ msg: "Order not found" });
        }
        else {
            const UpdatedOrder = await Orders.findByIdAndUpdate({ _id: orderId }, {
                orderAcceptOrDecline: "Accepted",
                orderStatus: "Processed",
            });

            return res.status(200).json({ msg: "Order Accepted Successfully" });
        }
    }
    catch (error) {
        return res.status(400).json({ msg: "Something wrong" });
    }

}

exports.rejectOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Orders.findOne({ _id: orderId });
        if (!order) {
            return res.status(400).json({ msg: "Order not found" });
        }
        else {
            const UpdatedOrder = await Orders.findByIdAndUpdate({ _id: orderId }, {
                orderAcceptOrDecline: "Rejected",
            });

            return res.status(200).json({ msg: "Order Rejected Successfully" });
        }
    }
    catch (error) {
        return res.status(400).json({ msg: "Something wrong" });
    }
}

exports.deliveredOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await Orders.findOne({ _id: orderId });
        if (!order) {
            return res.status(400).json({ msg: "Order not found" });
        }
        else {
            const UpdatedOrder = await Orders.findByIdAndUpdate({ _id: orderId }, {
                orderStatus: "Delivered",
            });

            return res.status(200).json({ msg: "Order Delivered Successfully" });
        }
    }
    catch (error) {
        return res.status(400).json({ msg: "Something wrong" });
    }
}

exports.getOrderByUser = async (req, res) => {
    const { userId } = req.body
    try {
        const userOrders = await Orders.find({ userId: userId });
        if (!userOrders) {
            return res.status(400).json({ msg: "No such user exists" });
        }
        else {
            return res.status(201).json({ msg: "Orders fetched successfully", userOrders: userOrders });
        }
    }
    catch (error) {
        return res.status(400).json({ msg: "Something went wrong", err: error });
    }
}

exports.getOrderByOwner = async (req, res) => {
    const { ownerId } = req.body
    try {
        const ownerOrders = await Orders.find({ ownerId: ownerId });
        if (!ownerOrders) {
            return res.status(400).json({ msg: "No such user exists" });
        }
        else {
            return res.status(201).json({ msg: "Orders fetched successfully", ownerOrders: ownerOrders });
        }
    }
    catch (error) {
        return res.status(400).json({ msg: "Something went wrong", err: error });
    }
}