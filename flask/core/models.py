from . import db 
from sqlalchemy.orm import relationship

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    lastname = db.Column(db.String(50))
    telephone = db.Column(db.String(50), unique=False,nullable=False)
    email = db.Column(db.String(50), unique=False, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    active = db.Column(db.Boolean, nullable=False)


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(50), nullable=False)
    nameProd = db.Column(db.String(50), nullable=False)
    categoriaProd0 = db.Column(db.String(50), nullable=False)
    categoriaProd1 = db.Column(db.String(50), nullable=False)
    alergenosProd0nameAlerg = db.Column(db.String(50), nullable=True)
    alergenosProd0imageAlerg = db.Column(db.String(50), nullable=True)
    alergenosProd1nameAlerg = db.Column(db.String(50), nullable=True)
    alergenosProd1imageAlerg = db.Column(db.String(50), nullable=True)
    alergenosProd2nameAlerg = db.Column(db.String(50), nullable=True)
    alergenosProd2imageAlerg = db.Column(db.String(50), nullable=True)
    price = db.Column(db.Integer)
    unidades = db.Column(db.Integer)
    


class Faqs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500), nullable=False)
    answer = db.Column(db.String(500),nullable=False)

class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

class Orders(db.Model): 
    id = db.Column(db.Integer,primary_key=True) #order id
    date = db.Column(db.DateTime, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    special_id = db.Column(db.Integer, nullable=True)
    message = db.Column(db.String(500), nullable=True)
    total = db.Column(db.Float,nullable=True)
    

class RelProductsOrders(db.Model): #tabla relacional entre orders y products
    __tablename__ = 'relProductsOrders'
    id = db.Column(db.Integer,primary_key=True)
    quantity = db.Column(db.Integer,nullable=True) #en esa orden tenemos 'x' cantidad
    product_id = db.Column(db.Integer, db.ForeignKey('products.id', onupdate='cascade', ondelete="cascade"))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id',onupdate='cascade', ondelete="cascade"))
    products = relationship('Products', backref='relProductsOrders')
    orders = relationship('Orders', backref='relProductsOrders')








