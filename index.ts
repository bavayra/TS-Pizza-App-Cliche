type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  id: number;
  pizza: Pizza;
  status: "ordered" | "completed";
};

let cashInRegister = 100;
let orderQueue: Order[] = [];
let nextOrderId = 1;
let nextPizzaId = 1;

const menu: Pizza[] = [
  { id: nextPizzaId++, name: "Marherita", price: 8 },
  { id: nextPizzaId++, name: "Pepperoni", price: 10 },
  { id: nextPizzaId++, name: "Veggie", price: 10 },
  { id: nextPizzaId++, name: "Hawaiian", price: 9 },
];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const newPizza: Pizza = { id: nextPizzaId++, ...pizzaObj };
  menu.push(newPizza);
  return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
  const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
  if (!selectedPizza) {
    console.error(`${pizzaName} not found in menu`);
    return;
  }
  cashInRegister += selectedPizza.price;
  const newOrder: Order = {
    id: nextOrderId++,
    pizza: selectedPizza,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function addToArray<T>(array: T[], item: T): T[] {
  array.push(item);
  return array;
}

addToArray<Pizza>(menu, { id: nextPizzaId++, name: "Test Pizza", price: 5 });
addToArray<Order>(orderQueue, {
  id: nextOrderId++,
  pizza: menu[2] as Pizza,
  status: "completed",
});

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.id === orderId);
  if (order) {
    order.status = "completed";
    return order;
  } else {
    return;
  }
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else if (typeof identifier === "string") {
    return menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
  } else {
    throw new Error("Identifier must be a string or number");
  }
}

getPizzaDetail(2);
console.log(getPizzaDetail("Hawaiian"));

addNewPizza({ name: "BBQ Chicken", price: 11 });
addNewPizza({ name: "Meat Lovers", price: 12 });
addNewPizza({ name: "Four Cheese", price: 9 });

placeOrder("Pepperoni");
completeOrder(1);

console.log("Menu:", menu);
//console.log("Cash in Register:", cashInRegister);
//console.log("Order Queue:", orderQueue);

/*type User = {
  id: number;
  username: string;
  role: "member" | "admin" | "contributor";
};

type updatedUser = Partial<User>;

let nextUserId = 1;

const users: User[] = [
  { id: 1, username: "alice", role: "admin" },
  { id: 2, username: "bob", role: "member" },
  { id: 3, username: "charlie", role: "contributor" },
];

function updateUser(id: number, updates: any) {
  const foundUser = users.find((u) => u.id === id);
  if (!foundUser) {
    throw new Error("User not found");
  } else {
    Object.assign(foundUser, updates);
  }
}

function addNewUser(newUser: Omit<User, "id">): User {
  const user: User = {
    id: nextUserId++,
    ...newUser,
  };
  users.push(user);
  return user;
}*/
