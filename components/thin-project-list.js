import React from 'react'
import ThinProject from './thin-project'

const projects = [
  {
    id: 'kratos',
    title: `Kratos`,
    descriptiveTitle: 'User Management',
    description:
      'Cloud native user management system. Provision IDs, store user information, configure authentication methods and use a headless API.',
    path: '/kratos',
    links: {
      quickstart: 'https://www.ory.sh/docs/next/kratos/quickstart'
    },
    visual: {
      type: "lottie",
      data: require('../public/lotties/lf30_editor_Poez3y.json'),
    }
  },
  {
    id: 'hydra',
    title: `Hydra`,
    descriptiveTitle: 'OAuth 2.0 and OpenID Connect',
    description:
      'OAuth 2.0 and OpenID Certified® OpenID Connect server. Secure access to your applications and APIs.',
    path: '/hydra',
    links: {
      quickstart: 'https://www.ory.sh/hydra/docs/5min-tutorial'
    },
    // visual: hydraAnimation
  },
  {
    id: 'oathkeeper',
    title: `Oathkeeper`,
    descriptiveTitle: 'Identity and Access Proxy',
    description:
      'Identity and Access Proxy (IAP). Authenticate and authorize all traffic, using Zero Trust / BeyondCorp as open source.',
    path: '/oathkeeper',
    links: {
      quickstart: 'https://www.ory.sh/oathkeeper/docs/index'
    },
    // visual: oathkeeperAnimation
  },
  {
    id: 'keto',
    title: `Keto`,
    descriptiveTitle: 'Permission and Role Management',
    description:
      'Access Control and Permission Management Server. Use best practices (RBAC, ABAC, ACL, ...) to secure your application.',
    path: '/keto',
    links: {
      quickstart: 'https://www.ory.sh/keto/docs/configure-deploy'
    },
    // visual: ketoAnimation
  }
]


const ThinProjectList = () => (
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
