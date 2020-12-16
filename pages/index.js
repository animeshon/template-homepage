import React from 'react';
import Header from '@/components/Header/Header'
import UserTypeButton from '@/components/UserTypeButton'

const UserDispacher = () => {
  return (
    <div className="home">
      <Header />
      <div className="home-search-box">
        <div className="internal-space">
          <h1>
            <span>Creator, User or Developer?</span>
          </h1>
          <h3>
            <span>Which kind of user are you?</span>
          </h3>
          <div className="user-type-button-grid">
            <UserTypeButton type={"creator"} href={"/creator"}>
              <img src={"../svg/painter.svg"} />
              <span>Creator</span>
            </UserTypeButton>
            <UserTypeButton type={"user"} href={"/user"}>
              <img src={"../svg/open-book.svg"} />
              <span>User</span>
            </UserTypeButton>
            <UserTypeButton type={"dev"} href={"/developer"}>
              <img src={"../svg/material-computer.svg"} />
              <span>Developer</span>
            </UserTypeButton>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default UserDispacher;