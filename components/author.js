import React from 'react'

const authors = {
  // aeneasr: {
  //   fullname: 'Aeneas Rekkas',
  //   github: 'http://github.com/aeneasr'
  // },
  // zepatrik: {
  //   fullname: 'Patrik Neu',
  //   github: 'https://github.com/zepatrik'
  // }
}

const Author = ({ name, className }) => {
  const profile = authors[name]
  if (!profile) {
    return <span className={className}>{name}</span>
  }

  return (
    <a href={profile.github} className={className}>
      {profile.fullname}
    </a>
  )
}

export default Author
