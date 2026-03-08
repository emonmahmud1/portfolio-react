import clientPromise from '../db/mongodb'

export async function getHero() {
  const client = await clientPromise
  const db = client.db('portfolio')
  return await db.collection('hero').findOne({})
}

export async function updateHero(data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('hero').updateOne({}, { $set: data }, { upsert: true })
}
