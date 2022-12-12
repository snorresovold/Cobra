import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <h1>hello world</h1>
      <form method="POST" action="/">
      <input type="text" name="name" placeholder="Do some math">
      <button type="submit">Submit</button>
      </form>
    </div>
  )
}
