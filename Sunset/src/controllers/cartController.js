const db = require("../database/models");

const getOrder = async (id) => {

    try {

        let order = db.Order.findOne({
            where: {
                userId: id
            },
            include: [
                {
                    association : 'carts',
                    include: [
                        {
                            association: 'product'
                        }
                    ]
                }
            ]
        })

        return order

    } catch (error) {
        console.log(error)
    }

}


module.exports = {
  list: async (req, res) => {
    if (req.session.userLogin && req.session.userLogin.order) {
      return res.status(200).json({
        ok: true,
        order: req.session.userLogin.order.id,
        carts: req.session.userLogin.order.carts,
      });
    } else {
      return res.status(200).json({
        ok: false,
        order: null,
        carts: [],
      });
    }
  },

  addItem: async (req, res) => {
    
     let product = await db.Product.findByPk(req.body.id);
        if (req.session.userLogin) {
          if (req.session.userLogin.order) {
            let item = req.session.userLogin.order.carts.find(
              (cart) => cart.product.id == product.id
            );
            if (item) {
              await db.Cart.update(
                {
                  quantity: item.quantity + 1,
                },
                {
                  where: { id: item.id },
                }
              );
            } else {
              await db.Cart.create({
                userId: req.session.userLogin.order.userId,
                productId: product.id,
                quantity: 1,
                orderId: req.session.userLogin.order.id,
              });
            }
          } else {
            let newOrder = await db.Order.create({
              userId: req.session.userLogin.id,
              statusId: 'pendiente',
              total: 0,
            });
            await db.Cart.create({
              userId: newOrder.userId,
              productId: product.id,
              quantity: 1,
              orderId: newOrder.id,
            });
          }
          let order = await getOrder(req.session.userLogin.id);
          req.session.userLogin.order = order;
          return res.status(201).json({
            ok: true,
            order: order.id,
            carts: order.carts,
          });
        } 

    
  },

  removeItem: async (req, res) => {},

  removeItemAll: async (req, res) => {},

  removeAll: async (req, res) => {},
};
