from flask import Flask, render_template, request,make_response, session, escape, redirect, url_for, flash, Blueprint, jsonify
from datetime import datetime
from .models import Users,Products,Faqs,Orders,Messages,RelProductsOrders,db,relationship
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bootstrap import Bootstrap
from requests import get
from sqlalchemy import null, select

main = Blueprint('main', __name__)


@main.route("/")
def index():
    return render_template("homepage.html")


@main.route("/index")
def index2():
    return render_template("homepage.html")

@main.route("/about")
def about():
    return render_template("sobre-nosotros.html")

@main.route("/products")
def products():
    return render_template("productos.html")

@main.route("/contact")
def contact():
    return render_template("contacto.html")

@main.route("/carrito", methods=['GET','POST'])
def carrito():
    return render_template("carrito.html")

@main.route("/politica")
def politica():
    return render_template("politica-de-privacidad.html")

@main.route("/site")
def site():
    return render_template("sitemap.html")

@main.route("/cookies")
def cookies():
    return render_template("politica-de-cookies.html")

@main.route("/historial")
def historial():
    return render_template("historial-usuario.html")

@main.route("/getHistorial", methods=['GET'])
def gethistorial():
    user = Users.query.filter_by(email=session.get("email")).first() 
    order = Orders.query.filter_by(user_id=user.id).all() #todos los order por un id determinado
    print(user)
    result = []
    product = []
    for i in range(0,len(order)): 
        relproducts = RelProductsOrders.query.filter_by(order_id=order[i].id).all()
        for j in range(0,len(relproducts)):
            products = Products.query.filter_by(id=relproducts[j].product_id).all()
            print('productos',products)
            for a in range(0,len(products)):
                product.append({
                    'name': products[a].nameProd
                })
        result.append(
            {
                'id':order[i].id,
                'date':order[i].date,
                'productos': product,
                'precioTotal': order[i].total,
                'message': order[i].message
            }
        )
        product = []
        print(order[i].id)
 

    return jsonify(result)




@main.route("/insert_order",methods=['POST'])
def insert_order():
    req_data = request.get_json()
    print("respuesta insert: ",req_data)
   
    user = Users.query.filter_by(email=session.get("email")).first() 
    print(user)
    if user and user.active:

        print("hay usuariooo")
        my_id = user.id
        order = Orders(date=datetime.now(),user_id=my_id,special_id=null(), message=null(),total=req_data[1]['total'])
        db.session.add(order)
        db.session.commit()

        order_details = ({
                'id': order.id,
                'date': order.date,
                'user_id': order.user_id,
                'special_id':order.special_id,
                'message':order.message,
                'total':order.total
        })

        res = make_response(jsonify(order_details['id']), 200)
        return res
    else:
        res = make_response(jsonify('Not authorized'), 401)
        return res
    

@main.route('/rel',methods=['POST'])
def rel():
    global i
    req_data = request.get_json()
    print('paso 2: ',req_data)
    max = len(req_data[1])-1

    #select order_id from orders where user_id =(select id from users where id = 2) #subconsulta
    #select order_id from orders o join users u on o.user_id = u.id #join

    #sqlalchemy
    #query = db.session.query(Orders).\
    #join(Users).\
    #filter(Users.id == Orders.user_id).first()

    for i in range(len(req_data[1])):
        rel = RelProductsOrders(
            quantity=req_data[1][i]['quantity'],
            product_id= req_data[1][i]['product_id'],
            order_id = req_data[0]['order_id']
            )
        db.session.add(rel)

    db.session.commit()
    res = make_response(jsonify('OK', 200))
    return res
    
@main.route("/insert_special_order",methods=['GET','POST'])
def insert_sorder():
    user = Users.query.filter_by(email=session.get("email")).first() 
    if user and user.active:
        my_id = user.id
        new_sorder = Orders(date=datetime.now(),user_id=my_id,special_id=1, message=request.form['userPedidoEspecial'], total=null())
        db.session.add(new_sorder)
        db.session.commit()
        flash("Muchas gracias. Tu pedido especial fue enviado. Te contactaremos lo antes posible.", "success")
        return render_template('pedido-especial.html')
    else:
        return render_template('login.html')

       
@main.route("/profile")
def profile():
    user = Users.query.filter_by(email=session.get("email")).first() 
    user_details = {
                'name': user.name,
                'lastname': user.lastname,
                'telephone': user.telephone,
                'email':user.email,
                'password':user.password
    }
    if user: 
        return render_template("perfil-usuario.html",user=user_details)
    return redirect(url_for('main.index'))

@main.route("/faqs")
def faqs():
    return render_template("faqs.html")

@main.route("/alergenos")
def alergenos():
    return render_template("alergenos-intolerancias.html")

@main.route("/pedido-especial", methods=['GET','POST'])
def especial():
    return render_template("pedido-especial.html")

@main.route("/signup", methods=["GET", "POST"])
def signup():
    
    if request.method == 'POST':
        user = Users.query.filter_by(email=request.form["userEmail"]).first()
        hashed_pw = generate_password_hash(request.form["userPassword"], method="sha256")
        print(user)
        if not user :
            new_user = Users(name=request.form["userNombre"], lastname=request.form["userApellido"],
            telephone=request.form["userTelefono"], email=request.form["userEmail"] ,password=hashed_pw,
            active=True)
            db.session.add(new_user)
            db.session.commit()
            flash("Genial! Te has registrado", "success")
            return redirect(url_for("main.login"))
        elif user and user.active == False:
            print('activando...')
            hashed_pw = generate_password_hash(request.form["userPassword"], method="sha256")
            user.name = request.form['userNombre']
            user.lastname=request.form["userApellido"]
            user.telephone=request.form["userTelefono"]
            user.password=hashed_pw
            user.active = True
            db.session.commit()
            flash("Genial! Te has registrado", "success")
            return redirect(url_for("main.login"))
        else:
            flash("Ese email ya ha sido registrado", "error")
            return render_template("registro.html")

    return render_template("registro.html")
    

@main.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = Users.query.filter_by(email=request.form["userEmail"]).first()

        session["email"] = request.form['userEmail']

        if user.active==True  and check_password_hash(user.password, request.form["userPassword"]):
            user_details = {
                'name': user.name,
                'lastname': user.lastname,
                'telephone': user.telephone,
                'email':user.email,
                'password':user.password,
                'active': user.active
            }
            session['user'] = user_details

            flash("Bienvenido a tu perfil de usuario!", "success")
            return  render_template("perfil-usuario.html", user=user_details)
        else:
            session.pop("email",None)
            flash("Password y/o email incorrecto. Prueba otra vez", "error")
            return render_template('login.html')
    return render_template("login.html")


@main.route("/delete",methods=['GET','POST'])
def delete():
    user = Users.query.filter_by(email=session.get("email")).first() 
    user.active = False
    db.session.commit()

    return render_template("registro.html")


@main.route("/update", methods=['GET','POST'])
def update():

        if request.method == "POST":
                user = Users.query.filter_by(email=session.get("email")).first() 

                if request.form['userPassword'] == "":
                    hashed_pw = generate_password_hash(request.form["userPassword"], method="sha256")
                hashed_pw = request.form["userPassword"]

                user.name = request.form['userNombre']
                user.lastname = request.form['userApellido']
                user.telephone = request.form['userTelefono']
                user.email = request.form['userEmail']
                user.password = hashed_pw
                db.session.commit()

                user_details = {
                'name': user.name,
                'lastname': user.lastname,
                'telephone': user.telephone,
                'email':user.email,
                'password':user.password
                }

                flash("Has actualizado tus datos correctamente","success")
                return render_template('perfil-usuario.html',user=user_details)
        return "MAAAAL. no vas por el método post"

@main.route("/logout")
def logout():
    
    user = Users.query.filter_by(email=session.get("email")).first() 
    if user and user.active==True: 
        session.pop("email",None)
        flash("Has cerrado sesion!","error")
        return render_template("login.html")
    flash("Para cerrar sesión tienes que estar conectado primero!","error")
    return redirect(url_for('main.index'))


#endpoint products to ana (from mysql to json)

@main.route('/get_products', methods=['POST'])
def get_products():
   global i
   productList = []
   products = Products.query.all()
   max = len(products)-1
   print('patri',len(products))

   for i in range(0,len(products)):
        productList.append(
           {
            'id':products[i].id,
            'image':products[i].image,
            'nameProd': products[i].nameProd,
            'categoriaProd0':products[i].categoriaProd0,
            'categoriaProd1':products[i].categoriaProd1,
            "alergenosProd": [
                { "nameAlerg":products[i].alergenosProd0nameAlerg, "imageAlerg":products[i].alergenosProd0imageAlerg},
                { "nameAlerg":products[i].alergenosProd1nameAlerg, "imageAlerg":products[i].alergenosProd1imageAlerg},
                { "nameAlerg":products[i].alergenosProd2nameAlerg, "imageAlerg":products[i].alergenosProd2imageAlerg}
            ],
            'price' : products[i].price,
            'unidades' : products[i].unidades
            }
       )
    
   if i == max:
      return jsonify(productList)




@main.route('/get_faqs', methods=['POST'])
def get_faqs():
    faqsList = []
    faqs = Faqs.query.all()
    max = len(faqs)-1
    print(max)
    for i in range(0,len(faqs)):
        faqsList.append(
           {
            'id':faqs[i].id,
            'question':faqs[i].question,
            'answer':faqs[i].answer
            }
       )

        if i == max:
         return jsonify(faqsList)


@main.route("/user_messages", methods=["GET","POST"])
def user_messages():

    user = Users.query.filter_by(email=session.get("email")).first() 
    
    if user and user.active ==True:
        new_message = Messages(message=request.form['userMensaje'],user_id=user.id)
        db.session.add(new_message)
        db.session.commit()
        flash("Muchas gracias. Tu mensaje se ha enviado. Te contestaremos lo antes posible.", "success")
        return render_template("contacto.html")

    else:
       return render_template("login.html")



@main.route("/form")
def form():

    user = Users.query.filter_by(email=session.get("email")).first() 
    if user: 
        user_details = {
                'name': user.name,
                'lastname': user.lastname,
                'telephone': user.telephone,
                'email':user.email,
                'password':user.password
            }
    return render_template('form.html',user=user_details)


@main.route("/header")
def header():

    user = Users.query.filter_by(email=session.get("email")).first() 
    
    if user and user.active==True:
        return render_template("header2.html")
    else:
        return render_template("header.html")


@main.route("/footer",methods=["POST","GET"])
def footer():
    return render_template("footer.html")
    