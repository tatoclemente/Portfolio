import Link from 'next-intl/link'
import React from 'react'

const IntlSwitcher = () => {
  return (
    <div>
      <Link href='/' locale='en'>
        EN
      </Link>{" "}
      |{" "}
      <Link href='/' locale='es'>
        ES
      </Link>
    </div>
  )
}

export default IntlSwitcher