import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import {
  Container,
  CssBaseline,
  Typography,
  Button,
  ListItem,
  List,
  ListItemText,
} from '@material-ui/core'
import _ from 'lodash'
import firebase from '../src/utils/firebase'

const db = firebase.firestore()

type Story = {
  id: number
  title: string
}

const isStory = (doc: firebase.firestore.DocumentData): doc is Story =>
  typeof doc.id === 'number' && typeof doc.title === 'string'

type Props = {}

const WithInitialProps: NextPage<Props> = () => {
  const [storyCount, setStoryCount] = useState<number | null>(null)
  const [stories, setStories] = useState<Story[]>([])

  const loadStory = async (count: number) => {
    const ids = _.sampleSize(_.range(1, count), 3)

    console.log(ids)

    const stories = await Promise.all(
      ids.map(async id => {
        const snap = await db
          .collection('stories')
          .where('id', '==', Number(id))
          .get()

        const doc = snap.docs[0]

        return doc && doc.data()
      })
    )

    setStories(stories.filter(isStory))
  }

  useEffect(() => {
    db.collection('all')
      .doc('info')
      .get()
      .then(snap => {
        if (!snap.exists) {
          return
        }
        const info = snap.data()
        const count = (info && info.count) || 0

        setStoryCount(count)
        loadStory(count)
      })
  }, [])

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div>
        <Typography style={{ padding: '16px 0' }} component="h1" variant="h4">
          億万長者話題ボックス
        </Typography>
        <Typography style={{ padding: '16px 0' }} component="h2" variant="h5">
          話題にどうぞ。VIP からネタを収集。 ネタ数: {storyCount || '---'}
        </Typography>
        {storyCount === null ? (
          <Typography>ロード中</Typography>
        ) : (
          <Button
            fullWidth
            color="primary"
            size="large"
            variant="outlined"
            onClick={() => {
              loadStory(storyCount)
            }}
          >
            話題を引く
          </Button>
        )}
        <List aria-label="secondary mailbox folders">
          {stories.map(story => (
            <ListItem key={story.id}>
              <ListItemText primary={`${story.id}: ${story.title}`} />
            </ListItem>
          ))}
        </List>
      </div>
    </Container>
  )
}

export default WithInitialProps
