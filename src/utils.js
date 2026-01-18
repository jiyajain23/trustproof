import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function mapRange(value, fromLow, fromHigh, toLow, toHigh) {
  if (fromLow === fromHigh) return toLow
  const percentage = (value - fromLow) / (fromHigh - fromLow)
  return toLow + percentage * (toHigh - toLow)
}

// Backend API Configuration
// NOTE: API key temporarily exposed for hackathon demo.
// In production, all tool calls are routed via backend.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://trust-proof.onrender.com/tools'
export const API_KEY = import.meta.env.VITE_API_KEY || '7JNVg4j5T5JoujBbOEMy47npbSGZZ2bW'

export async function callAPI(endpoint, data) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return await response.json()
}

