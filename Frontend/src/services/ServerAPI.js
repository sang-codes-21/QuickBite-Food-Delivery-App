const JSON_SERVER_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:3001";
export const FetchAllCuisines = async (cuisine) => {
  const trimmed = cuisine && cuisine.trim();
  const url =
    !trimmed || trimmed === "All"
      ? `${JSON_SERVER_BASE}/menuItems`
      : `${JSON_SERVER_BASE}/menuItems?cuisine=${encodeURIComponent(trimmed)}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error("failed to fetch from json server");
    return [];
  }

  const data = await response.json();
  return data || [];
};
export const FetchSingleFood = async (id) => {
  const res = await fetch(`${JSON_SERVER_BASE}/menuItems/${id}`);
  if (!res.ok) {
    console.error("failed to fetch single food item from json server");
    return null;
  }
  const data = await res.json();
  return data;
};

export async function FetchCart(userId) {
  if (!userId) return [];
  // Fetch cart rows for this user
  const cartRes = await fetch(`${JSON_SERVER_BASE}/cart?userId=${userId}`);
  if (!cartRes.ok) {
    console.error("failed to fetch cart from json server");
    return [];
  }
  const cart = await cartRes.json();

  // Fetch all menu items to join details locally
  const itemsRes = await fetch(`${JSON_SERVER_BASE}/menuItems`);
  if (!itemsRes.ok) {
    console.error("failed to fetch menu items while building cart view");
    return cart;
  }
  const menuItems = await itemsRes.json();

  const enriched = cart.map((row) => ({
    ...row,
    menuItem:
      menuItems.find((m) => Number(m.id) === Number(row.menuItemId)) || null,
  }));

  return enriched;
}

export async function AddToCart(menuItemId, quantity = 1, userId) {
  if (!userId) return null;
  const existingRes = await fetch(
    `${JSON_SERVER_BASE}/cart?menuItemId=${menuItemId}&userId=${userId}`,
  );
  if (!existingRes.ok) {
    console.error("failed to read cart before adding");
    return null;
  }
  const existing = await existingRes.json();
  if (existing.length > 0) {
    const item = existing[0];
    const newQty = (item.quantity || 0) + quantity;
    return UpdateCartItemQuantity(item.id, newQty);
  }

  const res = await fetch(`${JSON_SERVER_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ menuItemId, quantity, userId }),
  });
  if (!res.ok) {
    console.error("failed to add to cart");
    return null;
  }
  const data = await res.json();
  return data;
}

export async function UpdateCartItemQuantity(id, quantity) {
  const res = await fetch(`${JSON_SERVER_BASE}/cart/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) {
    console.error("failed to update cart item quantity");
    return null;
  }
  const data = await res.json();
  return data;
}

export async function RemoveCartItem(id) {
  const res = await fetch(`${JSON_SERVER_BASE}/cart/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.error("failed to remove cart item");
    return false;
  }
  return true;
}

export async function ClearCart(userId) {
  if (!userId) return false;
  const cartRes = await fetch(`${JSON_SERVER_BASE}/cart?userId=${userId}`);
  if (!cartRes.ok) {
    console.error("failed to fetch cart for clearing");
    return false;
  }
  const cart = await cartRes.json();
  await Promise.all(cart.map((item) => RemoveCartItem(item.id)));
  return true;
}

// Fetch all favorite items with attached menu details
export async function FetchFavorites(userId) {
  if (!userId) return [];
  const favRes = await fetch(`${JSON_SERVER_BASE}/favorites?userId=${userId}`);
  if (!favRes.ok) {
    console.error("Failed to fetch favorites");
    return [];
  }
  const favs = await favRes.json();

  const itemsRes = await fetch(`${JSON_SERVER_BASE}/menuItems`);
  if (!itemsRes.ok) {
    console.error("Failed to fetch menu items for favorites");
    return [];
  }
  const menuItems = await itemsRes.json();

  return favs.map((fav) => ({
    ...fav,
    menuItem: menuItems.find((m) => m.id === fav.menuItemId) || null,
  }));
}

export async function AddToFav(menuItemId, userId) {
  if (!userId) return null;
  // Check if already in favorites for this user
  const existingRes = await fetch(
    `${JSON_SERVER_BASE}/favorites?menuItemId=${menuItemId}&userId=${userId}`,
  );
  if (!existingRes.ok) {
    console.error("Failed to read favorites before adding");
    return null;
  }
  const existing = await existingRes.json();
  if (existing.length > 0) {
    return existing[0]; // Already in favorites
  }

  // Add to favorites
  const res = await fetch(`${JSON_SERVER_BASE}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ menuItemId, userId }),
  });
  if (!res.ok) {
    console.error("Failed to add to favorites");
    return null;
  }
  const data = await res.json();
  return data;
}
export async function RemoveFromFav(id) {
  const res = await fetch(`${JSON_SERVER_BASE}/favorites/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.error("Failed to remove favorite item");
    return false;
  }
  return true;
}
export const ALL_CUISINES = [
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

// --------- Auth helpers (json-server demo) ----------

export async function SignUpUser(payload) {
  const { name, email, password } = payload;
  // Check if user already exists
  const existingRes = await fetch(
    `${JSON_SERVER_BASE}/users?email=${encodeURIComponent(email)}`,
  );
  if (!existingRes.ok) {
    throw new Error("Unable to check existing users");
  }
  const existing = await existingRes.json();
  if (existing.length > 0) {
    throw new Error("User with this email already exists");
  }

  const res = await fetch(`${JSON_SERVER_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    throw new Error("Failed to sign up");
  }
  const data = await res.json();
  return data;
}

export async function LoginUser(email, password) {
  const res = await fetch(
    `${JSON_SERVER_BASE}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  );
  if (!res.ok) {
    throw new Error("Failed to login");
  }
  const users = await res.json();
  if (users.length === 0) {
    return null; // no matching user found
  }
  return users[0]; // return the matched user
}

// --------- Order helpers ----------

export async function CreateOrder(orderData) {
  const res = await fetch(`${JSON_SERVER_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...orderData,
      status: "Pending",
      createdAt: new Date().toISOString(),
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to create order");
  }
  return await res.json();
}

export async function FetchUserOrders(userId) {
  if (!userId) return [];
  const res = await fetch(
    `${JSON_SERVER_BASE}/orders?userId=${userId}&_sort=createdAt&_order=desc`,
  );
  if (!res.ok) {
    console.error("Failed to fetch user orders");
    return [];
  }
  return await res.json();
}

export async function FetchAllOrders() {
  const res = await fetch(
    `${JSON_SERVER_BASE}/orders?_sort=createdAt&_order=desc`,
  );
  if (!res.ok) {
    console.error("Failed to fetch all orders");
    return [];
  }
  return await res.json();
}

export async function UpdateOrderStatus(orderId, status) {
  const res = await fetch(`${JSON_SERVER_BASE}/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    throw new Error("Failed to update order status");
  }
  return await res.json();
}
