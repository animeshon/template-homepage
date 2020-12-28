import React from 'react'
import ThinProject from './thin-project'

const ThinProjectList = ({ projects }) => (
  <div>
    {projects.map(({ id, descriptiveTitle, description, path, visual }) => (
      <ThinProject
        key={id}
        href={path}
        theme={id}
        title={descriptiveTitle}
        description={description}
        learn={`Explore ${id}`}
        visual={visual}
      />
    ))}
  </div>
)

export default ThinProjectList
