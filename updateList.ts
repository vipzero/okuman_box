/* eslint import/no-extraneous-dependencies: 0 */

import chch from 'chch'
import hasha from 'hasha'
import firebase from './src/utils/firebase'

const db = firebase.firestore()

const main = async () => {
  const doc = await db
    .collection('all')
    .doc('info')
    .get()

  const data = doc.data()
  const count = data && data.count

  if (!count) {
    return
  }

  const threads = await chch.getThreads()

  const okuThraeds = threads.threads.filter(
    thread => /億円/.exec(thread.title) && !/【/.exec(thread.title)
  )

  console.log(okuThraeds)
  let id = Number(count) + 1

  okuThraeds.forEach(async (thread, i) => {
    const key = hasha(thread.title)

    const doc = await db
      .collection('stories')
      .doc(key)
      .get()

    if (doc.exists) {
      return
    }

    db.collection('stories')
      .doc(key)
      .set({
        id,
        title: thread.title,
      })
    id += 1
  })

  await db
    .collection('all')
    .doc('info')
    .update({
      count: id,
    })

  console.log(count)
}

main()
