// import { supabase } from '$lib/supabaseClient';
import { query } from '$lib/db';

export async function getAllOrders() {
  const orders = await query('SELECT * FROM orders');
  return orders;
}

export async function fetchGrants() {
  const grants = await query('SELECT * FROM grants');
  return grants;
}

export async function fetchTeams() {
  const teams = await query('SELECT * FROM teams');
  return teams;
}

export async function createOrder(orderData) {
  
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