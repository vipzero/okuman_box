import * as React from 'react'
import { Container, Typography, Button } from '@material-ui/core'
import { useRouter } from 'next/router'

import Link from 'next/link'
import firebase from './utils/firebase'

const db = firebase.firestore()

type Props = {}

function Story() {
  const { id } = useRouter().query
  const storyId = typeof id === 'string' ? id : '---'

  const [title, setTitle] = React.useState<string | null>(null)

  React.useEffect(() => {
    db.collection('stories')
      .where('id', '==', Number(storyId))
      .get()
      .then(snap => {
        snap.forEach(doc => {
          if (!doc.exists) {
            return
          }
          const data = doc.data()

          console.log({ data })
          const title = (data && data.title) || 'none'

          setTitle(title)
        })
      })
  }, [storyId])

  return (
    <Container component="main" maxWidth="xs">
      <Typography style={{ padding: '16px 0' }} variant="h5" component="h1">
        {title}
      </Typography>
      <Link href={`/`}>
        <Button fullWidth size="large" variant="outlined">
          戻る
        </Button>
      </Link>
    </Container>
  )
}

export default Story
