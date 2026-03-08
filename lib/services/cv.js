import clientPromise from '../db/mongodb'
import { ObjectId } from 'mongodb'

export async function getCVFiles() {
  const client = await clientPromise
  const db = client.db('portfolio')
  return await db.collection('cv_files').find({}).sort({ uploadedAt: -1 }).toArray()
}

export async function saveCVFile(data) {
  const client = await clientPromise
  const db = client.db('portfolio')
  const result = await db.collection('cv_files').insertOne(data)
  return result.insertedId
}

export async function getCVById(id) {
  const client = await clientPromise
  const db = client.db('portfolio')
  return await db.collection('cv_files').findOne({ _id: new ObjectId(id) })
}

export async function deleteCVFile(id) {
  const client = await clientPromise
  const db = client.db('portfolio')
  await db.collection('cv_files').deleteOne({ _id: new ObjectId(id) })
}
