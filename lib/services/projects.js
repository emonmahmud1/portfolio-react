import clientPromise from '../db/mongodb'
import { ObjectId } from 'mongodb'

export async function getProjects() {
  const client = await clientPromise
  const db = client.db('portfolio')
  return await db.collection('projects').find({}).sort({ order: 1, createdAt: -1 }).toArray()
}

export async function createProject(data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  const result = await db.collection('projects').insertOne({ ...data, createdAt: new Date() })
  return result.insertedId
}

export async function updateProject(id, data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('projects').updateOne({ _id: new ObjectId(id) }, { $set: data })
}

export async function deleteProject(id) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('projects').deleteOne({ _id: new ObjectId(id) })
}

export async function reorderProjects(orderedIds) {
  const client = await clientPromise
  const db = client.db('portfolio')
  const ops = orderedIds.map((id, index) => ({
    updateOne: {
      filter: { _id: new ObjectId(id) },
      update: { $set: { order: index } },
    },
  }))
  await db.collection('projects').bulkWrite(ops)
}
