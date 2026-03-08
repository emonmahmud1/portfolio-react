import clientPromise from '../db/mongodb'
import { ObjectId } from 'mongodb'

export async function getSkills() {
  const client = await clientPromise
  const db = client.db('portfolio')
  return await db.collection('skills').find({}).sort({ createdAt: 1 }).toArray()
}

export async function createSkill(data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  const result = await db.collection('skills').insertOne({ ...data, createdAt: new Date() })
  return result.insertedId
}

export async function updateSkill(id, data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('skills').updateOne({ _id: new ObjectId(id) }, { $set: data })
}

export async function deleteSkill(id) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('skills').deleteOne({ _id: new ObjectId(id) })
}
