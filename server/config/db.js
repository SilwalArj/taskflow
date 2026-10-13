import dns from 'node:dns'
import mongoose from 'mongoose'

export async function connectDB() {
  if (process.env.DNS_SERVERS) {
    dns.setServers(process.env.DNS_SERVERS.split(',').map((s) => s.trim()))
  }
  await mongoose.connect(process.env.MONGODB_URI)
  console.log(`MongoDB connected: ${mongoose.connection.name}`)
}