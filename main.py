
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ORDERS_FILE = Path(__file__).parent / "orders.json"


def load_orders():
    if ORDERS_FILE.exists():
        try:
            return json.loads(ORDERS_FILE.read_text())
        except json.JSONDecodeError:
            return []
    return []


def save_orders():
    ORDERS_FILE.write_text(
        json.dumps(orders, indent=2)
    )


orders = load_orders()


@app.get("/")
def home():
    return {"message": "NORTHMARK Backend is Running!"}


@app.get("/products")
def get_products():
    return [
        {
            "id": 1,
            "name": "Premium Black Tee",
            "price": 45,
            "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"
        },
        {
            "id": 2,
            "name": "Classic T-Shirt",
            "price": 30,
            "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"
        },
        {
            "id": 3,
            "name": "Essential Hoodie",
            "price": 85,
            "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80"
        },
        {
            "id": 4,
            "name": "Tailored Pants",
            "price": 95,
            "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80"
        }
    ]


class Order(BaseModel):
    name: str
    phone: str
    address: str
    items: list
    total: float


@app.post("/orders")
def create_order(order: Order):
    order_id = max(
        [item["order_id"] for item in orders],
        default=0
    ) + 1

    new_order = {
        "order_id": order_id,
        "name": order.name,
        "phone": order.phone,
        "address": order.address,
        "items": order.items,
        "total": order.total,
        "status": "Received"
    }

    orders.append(new_order)
    save_orders()

    return {
        "message": "Order placed successfully!",
        "order_id": order_id,
        "status": "Received"
    }


@app.get("/orders")
def get_orders():
    return orders
