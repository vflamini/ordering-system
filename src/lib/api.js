// import { supabase } from '$lib/supabaseClient';

const ip = "http://localhost:5000";

async function getOrderGrants(id) {
  try {
    const res = await fetch(ip + `/api/get/grant_order/order_id/${id}`)
    if (res.ok) {
      const data = await res.json();
      const grantOrders = data.map(grantOrder => {
        return {
          name: grantOrder.grant_name,
          percentage: grantOrder.grant_percentage
        }
      })
      return grantOrders;
    }
    return false;
  } catch {
    return false;
  }
}

async function getOrderTeams(id) {
  try {
    const res = await fetch(ip + `/api/get/team_order/order_id/${id}`)
    if (res.ok) {
      const data = await res.json();
      const teamOrders = data.map(teamOrder => {
        return teamOrder.team_name
      })
      return teamOrders;
    }
    return false;
  } catch {
    return false;
  }
}

export async function getOpenOrders() {
  try {
    const res = await fetch(ip + '/api/get/orders/status/open');
    if (res.ok) {
      const data = await res.json();
      const orders = await Promise.all(data.map(async order => {
        const date = new Date(order.order_date);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        const grants = await getOrderGrants(order.id);
        const teams = await getOrderTeams(order.id);
        console.log(teams);
        return {
          name: order.item_name,
          orderer: order.person_name,
          teams: teams,
          orderNum: order.order_number ? order.order_number : 'Not Assigned',
          listPrice: order.list_price,
          quantity: order.quantity,
          totalPrice: order.total_price,
          grants: grants,
          seller: order.company,
          link: order.link,
          priority: order.urgent ? 'Urgent' : 'Normal',
          submissionDate: formattedDate,
          comments: order.comments
        }
      }));
      return orders;
    }
    return false;
  } catch {
    return false;
  }
}

export async function fetchGrants() {
  const grants = await query('SELECT * FROM grants');
  return grants;
}

export async function createOrder(orderData) {
  try {
    const res = await fetch(ip + '/api/create/order', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...orderData
      })
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
}



// For Supabase
// export async function createOrder(orderData) {
//   const { data, error } = await supabase
//     .from('orders')
//     .insert(orderData);
//   if (error) throw error;
//   return data;
// }

// export async function getAllOrders() {
//   const { data, error } = await supabase
//     .from('orders')
//     .select('*');
//   if (error) throw error;
//   return data;
// }

// export async function updateOrder(id, updates) {
//   const { data, error } = await supabase
//     .from('orders')
//     .update(updates)
//     .eq('id', id);
//   if (error) throw error;
//   return data;
// }

// Add other API functions as needed