import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colors = ['yellow', 'green', 'orange', 'brown', 'blue']

const shadow = [
  'yellow-shadow',
  'green-shadow',
  'orange-shadow',
  'brown-shadow',
  'blue-shadow',
]

class App extends Component {
  state = {
    searchInput: '',
    isTrue: false,
    isShow: false,
    website: '',
    name: '',
    passwd: '',
    latestList: [],
  }

  websiteName = event => {
    this.setState({website: event.target.value})
  }

  userName = event => {
    this.setState({name: event.target.value})
  }

  passWd = event => {
    this.setState({passwd: event.target.value})
  }

  searchPasswd = event => {
    this.setState({searchInput: event.target.value})
  }

  addPasswdDetailToList = event => {
    event.preventDefault()
    const {name, website, passwd} = this.state
    const initial = name.slice(0, 1).toUpperCase()
    const getNum = Math.floor(Math.random() * 5)
    const getColor = colors[getNum]
    const getShadow = shadow[getNum]

    const newList = {
      id: v4(),
      initialLetter: initial,
      userName: name,
      websiteName: website,
      passWord: passwd,
      bgColor: getColor,
      borderShadow: getShadow,
    }

    this.setState(prevState => ({
      latestList: [...prevState.latestList, newList],
      isTrue: true,
      passwd: '',
      website: '',
      name: '',
      searchInput: '',
    }))
  }

  showPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  deleteItem = id => {
    const {latestList} = this.state
    const searchList = latestList.filter(eachList => eachList.id !== id)
    const caseOf = searchList.length !== 0
    this.setState({latestList: searchList, isTrue: caseOf})
  }

  render() {
    const {website, name, passwd, searchInput, isShow, latestList} = this.state

    const getLength = latestList.length
    let {isTrue} = this.state
    const searchList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (latestList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="top-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="top-img"
          />
          <div className="password-detail-container">
            <form className="form" onSubmit={this.addPasswdDetailToList}>
              <h1 className="heading">ADD NEW PASSWORD</h1>
              <div className="website-form">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website-img"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="web-input"
                  onChange={this.websiteName}
                  value={website}
                  required
                />
              </div>
              <div className="website-form">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website-img"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="web-input"
                  value={name}
                  onChange={this.userName}
                  required
                />
              </div>
              <div className="website-form">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website-img"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="web-input"
                  value={passwd}
                  onChange={this.passWd}
                  required
                />
              </div>
              <button className="add-btn" type="submit">
                ADD
              </button>
            </form>
          </div>
        </div>
        <div className="bottom-container">
          <div className="top-side">
            <div className="bottom-top-part">
              <h1 className="headingtwo">Your Passwords</h1>
              <p className="getlength">{getLength}</p>
            </div>
            <div className="search-box">
              <div className="website-form">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="website-img"
                />
                <input
                  type="search"
                  placeholder="Search"
                  className="web-input"
                  value={searchInput}
                  onChange={this.searchPasswd}
                />
              </div>
              <p className="search-instruction">Search Your Website</p>
            </div>
          </div>
          <hr className="line" />
          <div className="show-password-part">
            <input
              type="checkbox"
              id="check"
              className="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="show-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="no-passwd-img-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwd-img"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="show-passwd-cont">
              {searchList.map(eachList => (
                <li
                  key={eachList.id}
                  className={`passwd-box-cont ${eachList.borderShadow}`}
                >
                  <p className={`initial ${eachList.bgColor}`}>
                    {eachList.initialLetter}
                  </p>
                  <div className="center-part">
                    <p className="show-website">{eachList.websiteName}</p>
                    <p className="show-website">{eachList.userName}</p>
                    {!isShow && (
                      <img
                        alt="stars"
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="star-img"
                      />
                    )}
                    {isShow && (
                      <p className="show-website">{eachList.passWord}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachList.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del-img"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
