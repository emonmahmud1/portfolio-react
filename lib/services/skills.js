import clientPromise from '../db/mongodb'

export async function getSkills() {
  const client = await clientPromise
  const db = client.db('portfolio')
  return await db.collection('skills').find({}).toArray()
}

export async function createSkill(data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  const result = await db.collection('skills').insertOne(data)
  return result.insertedId
}

export async function updateSkill(id, data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('skills').updateOne({ _id: id }, { $set: data })
}

export async function deleteSkill(id) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('skills').deleteOne({ _id: id })
}
