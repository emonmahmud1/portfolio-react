import clientPromise from '../db/mongodb'

export async function getProjects() {
  const client = await clientPromise
  const db = client.db('portfolio')
  return await db.collection('projects').find({}).toArray()
}

export async function createProject(data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  const result = await db.collection('projects').insertOne(data)
  return result.insertedId
}

export async function updateProject(id, data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('projects').updateOne({ _id: id }, { $set: data })
}

export async function deleteProject(id) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('projects').deleteOne({ _id: id })
}
