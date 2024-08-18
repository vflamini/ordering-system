import { json } from '@sveltejs/kit';
import { query } from '$lib/db';

export async function GET({ url }) {
  const orders = await query('SELECT * FROM orders');
  return json(orders);
}

export async function POST({ request }) {
  const orderData = await request.json();
  const result = await query('INSERT INTO orders SET ?', [orderData]);
  return json({ id: result.insertId });
}