import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Container, CssBaseline, Typography, Button } from '@material-ui/core'
import firebase from '../src/utils/firebase'

const db = firebase.firestore()

type Props = {}

const WithInitialProps: NextPage<Props> = () => {
  const [storyId, setStoryId] = useState<number | null>(null)

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
        const storyId = Math.floor(Math.random() * count)

        setStoryId(storyId)
      })
  }, [])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography style={{ padding: '16px 0' }} component="h1" variant="h5">
          億万長者話題ボックス
        </Typography>
        <Typography style={{ padding: '16px 0' }} component="h2" variant="h5">
          話題にどうぞ。5ch VIP からどちらを選ぶかネタを収集。
        </Typography>
        {storyId === null ? (
          <Typography>ロード中</Typography>
        ) : (
          <Link href={`/story/${storyId}`} prefetch>
            <Button fullWidth color="primary" size="large" variant="outlined">
              話題を引く
            </Button>
          </Link>
        )}
      </div>
    </Container>
  )
}

export default WithInitialProps
