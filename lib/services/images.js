import clientPromise from '../db/mongodb'
import { ObjectId } from 'mongodb'

async function getCollection() {
  const client = await clientPromise
  return client.db('portfolio').collection('images')
}

export async function getImages() {
  const col = await getCollection()
  return col.find({}).sort({ uploadedAt: -1 }).toArray()
}

export async function saveImage(data) {
  const col = await getCollection()
  const doc = { ...data, uploadedAt: new Date() }
  const result = await col.insertOne(doc)
  return { ...doc, _id: result.insertedId }
}

export async function getImageById(id) {
  const col = await getCollection()
  return col.findOne({ _id: new ObjectId(id) })
}

export async function deleteImage(id) {
  const col = await getCollection()
  return col.deleteOne({ _id: new ObjectId(id) })
}
