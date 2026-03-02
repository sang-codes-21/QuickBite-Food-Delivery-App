const LOCAL_BASE = "http://localhost:3001";
const RENDER_BASE = "https://quickbite-fooddeliveryapp.onrender.com";

const API_BASE_URL =
  window.location.hostname === "localhost" ? LOCAL_BASE : RENDER_BASE;

// Fetch all menu items
export const getMenuItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/menuItems`);
    if (!response.ok) throw new Error("Failed to fetch menu items");
    return await response.json();
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

// Fetch cart items
export const getCartItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`);
    if (!response.ok) throw new Error("Failed to fetch cart items");
    const cartItems = await response.json();

    // Get full menu item details for each cart item
    const menuItems = await getMenuItems();
    return cartItems.map((cartItem) => {
      const menuItem = menuItems.find(
        (item) => item.id === cartItem.menuItemId
      );
      return {
        ...cartItem,
        ...menuItem,
        quantity: cartItem.quantity,
      };
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    throw error;
  }
};

// Fetch all users
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Fetch all restaurants
export const getRestaurants = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants`);
    if (!response.ok) throw new Error("Failed to fetch restaurants");
    return await response.json();
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

// Calculate admin statistics
export const getAdminStats = async () => {
  try {
    const [menuItems, cartItems, users] = await Promise.all([
      getMenuItems(),
      getCartItems(),
      getUsers(),
    ]);

    // Calculate total revenue from cart
    const totalRevenue = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // Calculate total orders (cart items count)
    const totalOrders = cartItems.length;

    // Count users
    const totalUsers = users.length;

    // Pending orders (for demo, using cart items)
    const pendingOrders = cartItems.filter((item) => item.quantity > 0).length;

    return {
      totalRevenue: `Rs ${totalRevenue.toLocaleString()}`,
      totalOrders: totalOrders.toString(),
      totalUsers: totalUsers.toString(),
      pendingOrders: pendingOrders.toString(),
    };
  } catch (error) {
    console.error("Error calculating admin stats:", error);
    throw error;
  }
};

// Get recent orders (using cart items as orders)
export const getRecentOrders = async () => {
  try {
    const cartItems = await getCartItems();
    const users = await getUsers();

    // Transform cart items into order format
    return cartItems
      .map((item, index) => {
        const user = users[index % users.length]; // Rotate through users
        const statuses = ["completed", "pending", "cancelled"];
        const status = statuses[index % 3];

        return {
          id: `#${10000 + index}`,
          customer: user?.name || "Guest",
          items: `${item.quantity}x ${item.title}`,
          total: `Rs ${(item.price * item.quantity).toFixed(2)}`,
          status: status,
          time: `${5 + index * 3} min ago`,
        };
      })
      .slice(0, 3); // Get first 3 orders
  } catch (error) {
    console.error("Error fetching recent orders:", error);
    throw error;
  }
};

// Get today's activity stats
export const getTodayActivity = async () => {
  try {
    const cartItems = await getCartItems();
    const users = await getUsers();

    // Simulate completed and pending orders
    const completed = cartItems.filter((_, i) => i % 2 === 0).length;
    const pending = cartItems.filter((_, i) => i % 2 !== 0).length;

    return {
      ordersCompleted: completed,
      ordersPending: pending,
      newCustomers: users.length,
    };
  } catch (error) {
    console.error("Error fetching today activity:", error);
    throw error;
  }
};

export default {
  getMenuItems,
  getCartItems,
  getUsers,
  getRestaurants,
  getAdminStats,
  getRecentOrders,
  getTodayActivity,
};
