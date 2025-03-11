import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// Define the structure of the counter object
interface Counter {
  counter: number
}

// Helper function to read the counter
const getCounter = (): number => {
  const filePath = path.join(process.cwd(), 'data', 'counter.json')
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    const counterData: Counter = JSON.parse(data)
    return counterData.counter || 0
  } catch (error) {
    return 0 // If the file doesn't exist, start from 0
  }
}

// Helper function to update the counter
const updateCounter = (newCounter: number): void => {
  const filePath = path.join(process.cwd(), 'data', 'counter.json')
  const counterData: Counter = { counter: newCounter }
  fs.writeFileSync(filePath, JSON.stringify(counterData))
}

export async function GET() {
  let counter = getCounter()
  return Response.json({ contactNumber: counter })
}

export async function POST() {
  // Get the current counter
  let counter = getCounter()

  // Increment the counter
  counter++

  // Save the new counter
  updateCounter(counter)

  // Return the unique contact number
  return Response.json({ contactNumber: counter })
}
