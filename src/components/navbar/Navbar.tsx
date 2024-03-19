import "./navbar.scss"

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>Admin</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src="data:image/jpeg;base64,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" alt="" />
          <span>Administrador</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  )
}

export default Navbar