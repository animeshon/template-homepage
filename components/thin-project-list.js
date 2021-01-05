import React from 'react'
import ThinProject from './thin-project'

const ThinProjectList = ({ projects }) => (
  <div>
    {projects.map(({ id, action, title, description, href, visual }) => (
      <ThinProject
        key={id}
        href={href}
        title={title}
        description={description}
        action={`${action}`}
        visual={visual}
      />
    ))}
  </div>
)

export default ThinProjectList
